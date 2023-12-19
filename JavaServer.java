import com.sun.net.httpserver.HttpServer;

import com.sun.net.httpserver.HttpHandler;


import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.InetSocketAddress;
import java.io.IOException;
import java.io.InputStream;

import java.io.BufferedReader;

import java.io.File;
import java.io.InputStreamReader;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;



import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.FileReader;
import java.io.FileWriter;


public class JavaServer {
    public static void main(String[] args) throws IOException {
        int port = 5500;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        

        // Serve static files
        server.createContext("/", new FileHandler());

        // Read JSON data
        server.createContext("/read", new ReadDataHandler());

        // Write JSON data
        server.createContext("/write", new WriteDataHandler());

        server.createContext("/upload", new UploadHandler());

        server.setExecutor(null); // Use the default executor
        server.start();
        System.out.println("Server is running on port " + port);
    }

    static class FileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Extract the requested path from the URL
            String path = exchange.getRequestURI().getPath();

            // Specify the root directory (the directory where the Java server is located)
            String rootDirectory = System.getProperty("user.dir");

            // Combine the root directory and the requested path to get the file's absolute
            // path
            String absolutePath = rootDirectory + path;

            // Load the file content as bytes
            File file = new File(absolutePath);

            if (file.exists() && file.isFile()) {
                // Set content type based on file extension
                Headers responseHeaders = exchange.getResponseHeaders();
                if (path.endsWith(".html")) {
                    responseHeaders.set("Content-Type", "text/html");
                } else if (path.endsWith(".js")) {
                    // responseHeaders.set("Content-Type", "module/javascript");
                     responseHeaders.set("Content-Type", "application/javascript");
                } else if (path.endsWith(".css")) {
                    responseHeaders.set("Content-Type", "text/css");
                } else {
                    responseHeaders.set("Content-Type", "text/plain");
                }

                

                byte[] fileBytes = Files.readAllBytes(file.toPath());

                // Send the file as a response
                exchange.sendResponseHeaders(200, fileBytes.length);
                OutputStream os = exchange.getResponseBody();
                os.write(fileBytes);
                os.close();
            } else {
                // If the file doesn't exist, return a 404 response
                String notFoundMessage = "File not found";
                exchange.sendResponseHeaders(404, notFoundMessage.length());
                OutputStream os = exchange.getResponseBody();
                os.write(notFoundMessage.getBytes());
                os.close();
            }
        }
    }

    // Custom handler for reading JSON data
    static class ReadDataHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Extract the requested filename from the URL
            String path = exchange.getRequestURI().getPath();
            path = path.replace("read/", "");
            // Specify the root directory (the directory where the Java server is located)
            String rootDirectory = System.getProperty("user.dir");
            System.out.println("Root " + rootDirectory + "Path" + path);
            // path = "your_data_directory" + path; // Replace with your data directory
            Path filePath = Paths.get(rootDirectory + path);

            // Read the JSON file
            String responseData = "";
            try (BufferedReader br = new BufferedReader(new FileReader(filePath.toString()))) {
                responseData = br.lines().collect(Collectors.joining("\n"));
            }

            // Send the JSON data as a response
            exchange.sendResponseHeaders(200, responseData.length());
            OutputStream os = exchange.getResponseBody();
            OutputStreamWriter writer = new OutputStreamWriter(os, StandardCharsets.UTF_8);
            writer.write(responseData);
            writer.close();
            os.close();
        }
    }

    // Custom handler for writing JSON data
    static class WriteDataHandler implements HttpHandler {

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Extract the requested filename from the URL
            String path = exchange.getRequestURI().getPath();
            path = path.replace("write/", "");

            System.out.println("Write Url" + path);

            // Specify the root directory (the directory where the Java server is located)
            String rootDirectory = System.getProperty("user.dir");

            // path = "your_data_directory" + path; // Replace with your data directory
            Path filePath = Paths.get(rootDirectory + path);

            System.out.println(filePath);

            // Read the JSON data from the request
            String requestData = new BufferedReader(
                    new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))
                    .lines()
                    .collect(Collectors.joining("\n"));

            // Write the JSON data to the file
            try (FileWriter fileWriter = new FileWriter(filePath.toString())) {
                fileWriter.write(requestData);
            }

            // Send a response
            String response = "Data saved successfully!";
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            OutputStreamWriter writer = new OutputStreamWriter(os, StandardCharsets.UTF_8);
            writer.write(response);
            writer.close();
            os.close();
        }
    }

    // Custom handler for handling file uploads
    static class UploadHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                Headers headers = exchange.getRequestHeaders();
                List<String> contentType = headers.get("Content-Type");
                System.out.println("ok1");
                if (contentType != null 
                // && contentType.get(0).startsWith("multipart/form-data")
                ) {

                    // Handle file upload
                    InputStream is = exchange.getRequestBody();

                    // Extract the requested filename from the URL
                    String path = exchange.getRequestURI().getPath();
                    String uploadedFileName = path.substring(path.lastIndexOf('/') + 1);
                    path = path.replace("/" + uploadedFileName, "");
                    path = path.replace("upload/", "");

                    System.out.println("Write Url" + path);

                    // Specify the root directory (the directory where the Java server is located)
                    String rootDirectory = System.getProperty("user.dir");

                    // Define the directory where you want to save uploaded files
                    String uploadDirectory = rootDirectory + path; // Replace with your desired directory

                    // Process the uploaded data and save the file
                    Path filePath = Paths.get(uploadDirectory, uploadedFileName);


                //    // Create a new output stream for the file
                    OutputStream os = Files.newOutputStream(filePath);

                //    // Write the image data to the output stream
                //    byte[] buffer = new byte[8192];
                //    int bytesRead;
                //    while ((bytesRead = is.read(buffer)) != -1) {
                //        os.write(buffer, 0, bytesRead);
                //    }

                //    // Flush and close the output stream
                //    os.flush();
                //    os.close();


                     Files.copy(is, filePath);

                    // Send a response indicating success or failure
                    String response = "File uploaded successfully!";
                    exchange.sendResponseHeaders(200, response.length());
                     os = exchange.getResponseBody();
                     os.write(response.getBytes());
                     os.close();
                }

            }
        }

    }


    
}
