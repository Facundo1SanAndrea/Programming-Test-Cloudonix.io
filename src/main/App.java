package main;

import io.vertx.core.vertx;


public class Main { 
    public static void main(String[] args) {
        Vertx vertx = Vertx.vertx();
        vertx.deployVerticle(new Server());
    }
}