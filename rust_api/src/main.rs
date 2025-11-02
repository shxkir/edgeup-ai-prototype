use actix_web::{web, App, HttpServer, HttpResponse, HttpRequest};
use reqwest::Client;
use std::env;

async fn forward(path: web::Path<String>, body: web::Bytes, req: HttpRequest) -> HttpResponse {
    let client = Client::new();
    let endpoint = path.into_inner();
    let base_url = env::var("PYTHON_SERVICE_URL").unwrap_or_else(|_| "http://localhost:8000".to_string());
    let url = format!("{}/{}", base_url, endpoint);

    // build request with same method and body
    let mut request_builder = client.request(req.method().clone(), &url).body(body.to_vec());
    if let Some(content_type) = req.headers().get("Content-Type") {
        request_builder = request_builder.header("Content-Type", content_type.clone());
    }
    if let Some(api_key) = req.headers().get("X-API-KEY") {
        request_builder = request_builder.header("X-API-KEY", api_key.clone());
    }

    let resp = match request_builder.send().await {
        Ok(r) => r,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };
    let status = resp.status();
    let bytes = resp.bytes().await.unwrap_or_default();
    HttpResponse::build(status).body(bytes)
}

async fn health() -> HttpResponse {
    HttpResponse::Ok().body("OK")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());

    HttpServer::new(|| {
        App::new()
            .route("/health", web::get().to(health))
            .route("/api/{endpoint:.*}", web::to(forward))
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
