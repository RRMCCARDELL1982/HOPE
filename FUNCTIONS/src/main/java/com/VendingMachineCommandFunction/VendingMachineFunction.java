package com.VendingMachineCommandFunction;

import java.util.*;
import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

public class VendingMachineFunction {
    @FunctionName("VendItem")
    public HttpResponseMessage run(
        @HttpTrigger(name = "req", methods = {HttpMethod.POST}, authLevel = AuthorizationLevel.FUNCTION) HttpRequestMessage<Optional<String>> request,
        final ExecutionContext context) {

        context.getLogger().info("VendItem function processed a request.");

        // Retrieve the request body
        @SuppressWarnings("unused")
        String requestBody = request.getBody().orElse("");

        // Trigger vending machine action based on request
        // You'll add your vending machine control logic here

        return request.createResponseBuilder(HttpStatus.OK).body("Vending machine action triggered.").build();
    }
}

