package main.java.test.project1;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;

import java.io.*;
import java.util.*;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class TextAnalyzerVerticle extends AbstractVerticle {

    private List<String> words;

    @Override
    public void start(Future<Void> startFuture) {

        // Load existing words from file
        try {
            FileInputStream fileInputStream = new FileInputStream("words.txt");
            ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);
            words = (List<String>) objectInputStream.readObject();
            objectInputStream.close();
            fileInputStream.close();
        } catch (IOException | ClassNotFoundException e) {
            // If no existing words file found, initialize words list
            words = new ArrayList<>();
        }

        // Set up HTTP server and router
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.route(HttpMethod.POST, "/analyze").handler(this::analyzeText);

        vertx.createHttpServer()
                .requestHandler(router)
                .listen(8080, result -> {
                    if (result.succeeded()) {
                        System.out.println("Text Analyzer server listening on port 8080");
                        startFuture.complete();
                    } else {
                        startFuture.fail(result.cause());
                    }
                });
    }

    private void analyzeText(RoutingContext routingContext) {
        // Get text from POST request
        JsonObject requestBody = routingContext.getBodyAsJson();
        String text = requestBody.getString("text");

        if (text == null) {
            routingContext.response().setStatusCode(400).end("Missing text parameter");
            return;
        }

        String closestByValue = null;
        String closestByLexical = null;
        int minDiffByValue = Integer.MAX_VALUE;

        // Iterate through all words and find closest matches
        for (String word : words) {
            // Find closest match by character value
            int diffByValue = Math.abs(getCharacterValue(text) - getCharacterValue(word));
            if (diffByValue < minDiffByValue) {
                minDiffByValue = diffByValue;
                closestByValue = word;
            }

            // Find closest match lexically
            if (closestByLexical == null || text.compareTo(word) < text.compareTo(closestByLexical)) {
                closestByLexical = word;
            }
        }

        // Return JSON response
        JsonObject responseBody = new JsonObject();
        if (closestByValue != null) {
            responseBody.put("value", closestByValue);
        }
        if (closestByLexical != null) {
            responseBody.put("lexical", closestByLexical);
        }

        routingContext.response().putHeader("content-type", "application/json").end(responseBody.encode());

        // Save new word to file
        if (!words.contains(text)) {
            words.add(text);
            try {
                FileOutputStream fileOutputStream = new FileOutputStream("words.txt");
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
                objectOutputStream.writeObject(words);
                objectOutputStream.close();
                fileOutputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private int getCharacterValue(String word) {
        int value = 0;
        for (char c : word.toCharArray()) {
            value += (int) c - 96;
        }
        return value;
    }
}