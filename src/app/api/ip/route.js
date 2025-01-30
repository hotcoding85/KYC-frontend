export async function GET(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",").pop() : req.socket.remoteAddress;
  return new Response(JSON.stringify({ ip }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(",").pop() : req.socket.remoteAddress;
  return new Response(JSON.stringify({ ip }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
