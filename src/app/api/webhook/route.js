import ApiClient from "../../../lib/ApiClient"; 

async function route(req) {
  const method = req.method;
  const headers = new Headers(req.headers);
  const apiClient = new ApiClient();

  let body;
  let endpoint;

  // Read and parse the body if applicable
  if (method === "POST" || method === "PUT" || method === "PATCH") {
    try {
      body = await req.json(); // Parse JSON body
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  if (method === "POST") {
    const type = body?.Type; 
    switch (type) {
      case "FIAT_DEPOSIT_RECEIVED":
        endpoint = "/transaction/incoming";
        break;
      case "MANAGEE_KYC_UPDATED":
        endpoint = "/users/approve";
        break;
      default:
        return new Response(JSON.stringify({ error: "Unhandled Type" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }
  }

  if (!endpoint) {
    return new Response(JSON.stringify({ error: "Endpoint not determined" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const result = await apiClient.request(
      endpoint,
      method,
      body,
      headers
    );

    return new Response(JSON.stringify(result), {
      status: result.status,
      headers: result.headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to forward request",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function GET(req) {
  console.log("Forwarding GET request...");
  return route(req);
}

export async function POST(req) {
  console.log("Forwarding POST request...");
  return route(req);
}
