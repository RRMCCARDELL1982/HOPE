package com.VendingMachineCommandFunction;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

/**
 * Azure Functions with HTTP Trigger.
 */
public class HttpTriggerJava1 {
    @FunctionName("HttpTriggerJava1")
    public HttpResponseMessage run(
        @HttpTrigger(name = "req", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION) HttpRequestMessage<Optional<String>> request,
        final ExecutionContext context) {

        context.getLogger().info("Java HTTP trigger processed a request.");

        // Retrieve the request body
        @SuppressWarnings("unused")
        String requestBody = request.getBody().orElse("");

        // Parse query parameter
        String name = request.getQueryParameters().get("name");

        if (name == null || name.isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("Please pass a name on the query string").build();
        } else {
            return request.createResponseBuilder(HttpStatus.OK).body("Command received and forwarded to the IoT Hub.").build();
        }
    }
}

