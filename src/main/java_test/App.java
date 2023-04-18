package main.java_test;

import io.vertx.core.vertx;


public class App {
    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        HttpServer httpServer = vertx.createHttpServer();
    
    
    httpServer.requestHandeler(router::accept).listen(8080); 
    }
}