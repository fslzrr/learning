use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use std::sync::Mutex;

// mutable data across threads
struct AppMutableState {
    app_name: String,
    counter: Mutex<i32>,
}

#[get("")]
async fn index(data: web::Data<AppMutableState>) -> impl Responder {
    let mut counter = data.counter.lock().unwrap();
    *counter += 1;
    HttpResponse::Ok().body(format!("{}, request number: {}", data.app_name, counter))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let app_state = web::Data::new(AppMutableState {
        app_name: String::from("Actix-web"),
        counter: Mutex::new(0),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(web::scope("/api").service(index))
    })
    .bind("localhost:5000")?
    .run()
    .await
}
