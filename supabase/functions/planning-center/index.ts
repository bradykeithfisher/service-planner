import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const APP_ID = Deno.env.get("PCO_APP_ID");
    const SECRET = Deno.env.get("PCO_SECRET");

    if (!APP_ID || !SECRET) {
      return new Response(
        JSON.stringify({ error: "Planning Center credentials not configured in Supabase secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = new URL(req.url);
    const path = url.searchParams.get("path") || "/services/v2/songs?per_page=100";
    const pcoUrl = `https://api.planningcenteronline.com${path}`;

    const credentials = btoa(`${APP_ID}:${SECRET}`);
    const pcoRes = await fetch(pcoUrl, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    const data = await pcoRes.json();

    return new Response(JSON.stringify(data), {
      status: pcoRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
