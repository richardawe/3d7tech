import { useState } from "react";

const THEME = {
  bg: "#FAFAF9", card: "#FFFFFF", cardBorder: "#E7E5E4",
  accent: "#1D4ED8", accentLight: "#EFF6FF",
  green: "#059669", greenBg: "#ECFDF5",
  amber: "#D97706", amberBg: "#FFFBEB",
  red: "#DC2626", redBg: "#FEF2F2",
  text: "#1C1917", textMuted: "#78716C", textDim: "#A8A29E",
  border: "#E7E5E4",
};

const TEXAS_ADDRESSES = [
  { label: "Downtown Houston", query: "1600 Smith St, Houston, TX 77002" },
  { label: "Austin (Mueller)", query: "1900 Aldrich St, Austin, TX 78723" },
  { label: "Dallas (Uptown)", query: "2900 McKinnon St, Dallas, TX 75201" },
  { label: "San Antonio", query: "5000 Broadway, San Antonio, TX 78209" },
  { label: "Fort Worth", query: "420 Main St, Fort Worth, TX 76102" },
];

const riskColor = (rating) => {
  if (!rating) return { bg: "#F5F5F4", text: "#78716C", label: "Unknown" };
  const r = rating.toLowerCase();
  if (r.includes("very high")) return { bg: "#FEF2F2", text: "#DC2626", label: "Very High" };
  if (r.includes("relatively high") || r === "high") return { bg: "#FFF7ED", text: "#EA580C", label: "High" };
  if (r.includes("relatively moderate") || r === "moderate") return { bg: "#FFFBEB", text: "#D97706", label: "Moderate" };
  if (r.includes("relatively low") || r === "low") return { bg: "#ECFDF5", text: "#059669", label: "Low" };
  if (r.includes("very low")) return { bg: "#F0FDF4", text: "#16A34A", label: "Very Low" };
  if (r.includes("no") || r.includes("insufficient")) return { bg: "#F5F5F4", text: "#78716C", label: "Minimal" };
  return { bg: "#F5F5F4", text: "#78716C", label: rating };
};

const fmt = (n) => n != null ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n) : "N/A";
const fmtNum = (n) => n != null ? new Intl.NumberFormat("en-US").format(n) : "N/A";
const fmtPct = (n) => n != null ? `${parseFloat(n).toFixed(1)}%` : "N/A";

const RiskBadge = ({ rating, size = "md" }) => {
  const c = riskColor(rating);
  const pad = size === "lg" ? "6px 16px" : size === "sm" ? "2px 8px" : "4px 12px";
  const fs = size === "lg" ? 14 : size === "sm" ? 10 : 12;
  return (
    <span style={{ display: "inline-block", padding: pad, borderRadius: 20, fontWeight: 700, fontSize: fs, background: c.bg, color: c.text, letterSpacing: 0.3 }}>
      {c.label}
    </span>
  );
};

const StatCard = ({ label, value, sub, color }) => (
  <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 8, padding: "12px 14px", flex: "1 1 140px", minWidth: 140 }}>
    <div style={{ fontSize: 10, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 18, fontWeight: 700, color: color || THEME.text, fontFamily: "'Georgia', serif" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 2 }}>{sub}</div>}
  </div>
);

const RiskRow = ({ icon, label, rating, detail }) => {
  const c = riskColor(rating);
  const val = rating?.toLowerCase().includes("very high") ? 95
    : rating?.toLowerCase().includes("high") ? 75
    : rating?.toLowerCase().includes("moderate") ? 50
    : rating?.toLowerCase().includes("low") && !rating?.toLowerCase().includes("very") ? 25
    : 8;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <span style={{ fontSize: 12, color: THEME.text, fontWeight: 500 }}>{icon} {label}</span>
        <RiskBadge rating={rating} size="sm" />
      </div>
      <div style={{ height: 5, background: "#F5F5F4", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${val}%`, background: c.text, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
      {detail && <div style={{ fontSize: 10, color: THEME.textDim, marginTop: 2 }}>{detail}</div>}
    </div>
  );
};

const Section = ({ icon, title, subtitle, children }) => (
  <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: THEME.text, fontFamily: "'Georgia', serif" }}>{title}</h2>
      </div>
      {subtitle && <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0, paddingLeft: 28 }}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

const DataRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${THEME.border}` }}>
    <span style={{ fontSize: 12, color: THEME.textMuted }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 600, color: THEME.text }}>{value}</span>
  </div>
);

const PROMPT_TEMPLATE = (query) => `Search the web for real property data about this Texas address: ${query}

Search for:
1. The exact census tract and county for this address
2. Census ACS 5-year data for that tract (median home value, median income, median rent, population, vacancy rate, owner-occupied %, median year built)
3. FEMA National Risk Index ratings for that area (overall risk, flood, hurricane, tornado, wildfire, hail, heat wave, earthquake, drought, cold wave, lightning, strong wind)
4. EPA environmental sites nearby (Superfund, brownfields, TRI toxic release sites)
5. FEMA flood zone designation for this location
6. Nearby schools

After searching, respond with ONLY a JSON object (no other text, no markdown fences) in this exact format:
{
  "address": "full matched address",
  "lat": 29.76,
  "lng": -95.36,
  "county": "County Name",
  "censusTract": "tract number",
  "tractFips": "48XXXNNNNNN",
  "census": {
    "medianHomeValue": 250000,
    "medianIncome": 65000,
    "medianRent": 1200,
    "population": 5000,
    "totalHousingUnits": 2500,
    "vacancyRate": 8.5,
    "medianYearBuilt": 1985,
    "ownerOccupiedPct": 55.2,
    "renterOccupiedPct": 44.8
  },
  "risk": {
    "overallRating": "Relatively Moderate",
    "overallScore": 45.2,
    "expectedAnnualLoss": 1500000,
    "socialVulnerability": "Relatively Low",
    "communityResilience": "Relatively High",
    "hazards": {
      "flood": {"rating": "Relatively High", "detail": "short note"},
      "hurricane": {"rating": "Relatively High", "detail": ""},
      "tornado": {"rating": "Relatively Moderate", "detail": ""},
      "wildfire": {"rating": "Very Low", "detail": ""},
      "heatWave": {"rating": "Relatively High", "detail": ""},
      "hail": {"rating": "Relatively Moderate", "detail": ""},
      "earthquake": {"rating": "Very Low", "detail": ""},
      "lightning": {"rating": "Relatively Moderate", "detail": ""},
      "strongWind": {"rating": "Relatively Moderate", "detail": ""},
      "drought": {"rating": "Relatively Moderate", "detail": ""},
      "coldWave": {"rating": "Relatively Low", "detail": ""}
    }
  },
  "environment": {
    "superfundSitesNearby": 0,
    "brownfieldsNearby": 2,
    "triSitesNearby": 5,
    "nearestBrownfield": {"name": "Site Name", "distance": "1.2 miles", "status": "status"}
  },
  "flood": {
    "floodZone": "X",
    "floodZoneDesc": "Area of minimal flood hazard",
    "historicalClaimsInCounty": 50000,
    "floodInsuranceRecommended": false
  },
  "schools": {
    "nearestElementary": {"name": "School Name", "distance": "0.5 miles"},
    "nearestMiddle": {"name": "School Name", "distance": "1.2 miles"},
    "nearestHigh": {"name": "School Name", "distance": "1.8 miles"}
  },
  "dataSources": ["Census Bureau ACS 5-Year","FEMA National Risk Index","EPA Envirofacts","FEMA NFIP","NCES"],
  "generatedAt": "${new Date().toISOString().split("T")[0]}"
}

Use REAL data from your web searches. Use null for anything genuinely not found. Respond with ONLY the JSON.`;

export default function HouseDataTexas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [customAddr, setCustomAddr] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem("anthropic_api_key") || ""; } catch { return ""; }
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  const saveApiKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem("anthropic_api_key", key); } catch { /* noop */ }
  };

  const search = async (query) => {
    if (!apiKey) {
      setShowKeyInput(true);
      setError("Please enter your Anthropic API key to search.");
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);
    setStatusMsg("Querying federal databases via AI backend\u2026");

    try {
      setStatusMsg("\uD83D\uDCCD Geocoding address & fetching Census, FEMA, EPA data...");

      const apiBody = {
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: PROMPT_TEMPLATE(query),
          },
        ],
        tools: [{ type: "web_search_20250305", name: "web_search" }],
      };

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify(apiBody),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`API error ${res.status}: ${errBody.slice(0, 200)}`);
      }

      const data = await res.json();
      setStatusMsg("\uD83D\uDD0D Parsing property intelligence data...");

      // Extract ALL text blocks from response
      let text = "";
      if (data.content && Array.isArray(data.content)) {
        for (const block of data.content) {
          if (block.type === "text" && block.text) {
            text += block.text + "\n";
          }
        }
      }

      if (!text.trim()) {
        throw new Error("No text content in API response. The model may still be searching. Try again.");
      }

      // Aggressively clean the response to find JSON
      text = text.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();

      // Find the outermost JSON object using bracket matching
      let depth = 0;
      let jsonStart = -1;
      let jsonEnd = -1;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === "{") {
          if (depth === 0) jsonStart = i;
          depth++;
        } else if (text[i] === "}") {
          depth--;
          if (depth === 0 && jsonStart !== -1) {
            jsonEnd = i;
            break;
          }
        }
      }

      if (jsonStart === -1 || jsonEnd === -1) {
        console.error("Raw response:", text.slice(0, 500));
        throw new Error("Could not find valid JSON in response. Please try again.");
      }

      const jsonStr = text.slice(jsonStart, jsonEnd + 1);

      let parsed;
      try {
        parsed = JSON.parse(jsonStr);
      } catch (parseErr) {
        // Try fixing common issues: trailing commas, etc.
        const cleaned = jsonStr
          .replace(/,\s*}/g, "}")
          .replace(/,\s*]/g, "]")
          .replace(/[\x00-\x1F\x7F]/g, " ");
        parsed = JSON.parse(cleaned);
      }

      setReport(parsed);
      setStatusMsg("");
    } catch (e) {
      setError(e.message);
      setStatusMsg("");
    } finally {
      setLoading(false);
    }
  };

  const d = report;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, system-ui, sans-serif", background: THEME.bg, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${THEME.border}`, padding: "14px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: THEME.accent, fontFamily: "'Georgia', serif" }}>housedata</span>
            <span style={{ fontSize: 14, color: THEME.textMuted }}>.us</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: THEME.accent, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: 1, marginLeft: 8 }}>Texas MVP</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${THEME.border}`, background: apiKey ? THEME.greenBg : THEME.amberBg, fontSize: 11, fontWeight: 600, cursor: "pointer", color: apiKey ? THEME.green : THEME.amber, fontFamily: "inherit" }}
            >
              {apiKey ? "\u2713 API Key Set" : "\u26A0 Set API Key"}
            </button>
            <span style={{ fontSize: 11, color: THEME.textDim }}>AI-powered property intelligence</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
        {/* API Key Input */}
        {showKeyInput && (
          <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: THEME.text, marginBottom: 8 }}>Anthropic API Key</div>
            <p style={{ fontSize: 12, color: THEME.textMuted, margin: "0 0 12px" }}>
              Your key is stored in your browser only and sent directly to Anthropic. Get one at{" "}
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" style={{ color: THEME.accent }}>console.anthropic.com</a>
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="password"
                placeholder="sk-ant-..."
                value={apiKey}
                onChange={e => saveApiKey(e.target.value)}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${THEME.border}`, fontSize: 13, fontFamily: "monospace" }}
              />
              <button
                onClick={() => setShowKeyInput(false)}
                style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: THEME.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", fontFamily: "'Georgia', serif", color: THEME.text }}>Property Intelligence Report</h1>
          <p style={{ fontSize: 13, color: THEME.textMuted, margin: "0 0 16px" }}>Enter a Texas address or pick a sample — live data from Census, FEMA, EPA</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {TEXAS_ADDRESSES.map((a, i) => (
              <button key={i} onClick={() => search(a.query)} disabled={loading}
                style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${THEME.border}`, background: THEME.bg, fontSize: 11, fontWeight: 600, cursor: loading ? "wait" : "pointer", color: THEME.text, fontFamily: "inherit" }}>
                \uD83D\uDCCD {a.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input placeholder="Enter any Texas address..." value={customAddr} onChange={e => setCustomAddr(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && customAddr) search(customAddr); }}
              style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${THEME.border}`, fontSize: 14, fontFamily: "inherit" }} />
            <button onClick={() => customAddr && search(customAddr)} disabled={loading || !customAddr}
              style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: THEME.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Status */}
        {loading && (
          <div style={{ background: THEME.accentLight, border: "1px solid #BFDBFE", borderRadius: 12, padding: 20, marginBottom: 24, textAlign: "center" }}>
            <div style={{ display: "inline-block", width: 20, height: 20, border: `3px solid ${THEME.accent}`, borderTopColor: "transparent", borderRadius: "50%", animation: "hdt-spin 0.8s linear infinite" }} />
            <style>{`@keyframes hdt-spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 14, fontWeight: 600, color: THEME.accent, margin: "8px 0 4px" }}>Fetching real data from federal APIs...</p>
            <p style={{ fontSize: 12, color: THEME.textMuted, margin: 0 }}>{statusMsg}</p>
            <p style={{ fontSize: 11, color: THEME.textDim, margin: "8px 0 0" }}>Census Bureau → FEMA National Risk Index → EPA → NFIP (10-20 seconds)</p>
          </div>
        )}

        {error && (
          <div style={{ background: THEME.redBg, border: "1px solid #FECACA", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: THEME.red, margin: 0 }}>{error}</p>
          </div>
        )}

        {/* ═══ REPORT ═══ */}
        {d && (
          <div>
            {/* Header card */}
            <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>Property Report</div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px", fontFamily: "'Georgia', serif" }}>{d.address}</h2>
                  <div style={{ fontSize: 12, color: THEME.textMuted }}>
                    {d.county} County · Census Tract {d.censusTract}{d.tractFips ? ` · FIPS ${d.tractFips}` : ""}
                  </div>
                  {d.lat && <div style={{ fontSize: 11, color: THEME.textDim, marginTop: 4 }}>{d.lat?.toFixed(4)}°N, {Math.abs(d.lng)?.toFixed(4)}°W</div>}
                </div>
                {d.risk && (
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600, marginBottom: 4 }}>Overall Risk</div>
                    <RiskBadge rating={d.risk.overallRating} size="lg" />
                    {d.risk.overallScore && <div style={{ fontSize: 11, color: THEME.textMuted, marginTop: 4 }}>Score: {d.risk.overallScore} / 100</div>}
                  </div>
                )}
              </div>
            </div>

            {/* Key stats */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
              <StatCard label="Median Home Value" value={fmt(d.census?.medianHomeValue)} sub={`${d.county} County`} color={THEME.accent} />
              <StatCard label="Median Income" value={fmt(d.census?.medianIncome)} sub="Household (annual)" />
              <StatCard label="Population" value={fmtNum(d.census?.population)} sub="Census tract" />
              <StatCard label="Year Built" value={d.census?.medianYearBuilt || "N/A"} sub="Median housing stock" />
            </div>

            {/* RISK */}
            {d.risk && (
              <Section icon="\u26A0\uFE0F" title="Natural Hazard Risk Assessment" subtitle="FEMA National Risk Index — Census tract level">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <StatCard label="Risk Score" value={d.risk.overallScore ?? "\u2014"} sub={d.risk.overallRating} color={riskColor(d.risk.overallRating).text} />
                  <StatCard label="Expected Annual Loss" value={d.risk.expectedAnnualLoss ? fmt(d.risk.expectedAnnualLoss) : "\u2014"} sub="Community-wide" color={THEME.amber} />
                  <StatCard label="Social Vulnerability" value={d.risk.socialVulnerability || "\u2014"} color={riskColor(d.risk.socialVulnerability).text} />
                  <StatCard label="Community Resilience" value={d.risk.communityResilience || "\u2014"} color={riskColor(d.risk.communityResilience).text} />
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Hazard Breakdown</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                  {d.risk.hazards && Object.entries(d.risk.hazards).map(([key, h]) => {
                    const icons = { flood: "\uD83C\uDF0A", hurricane: "\uD83C\uDF00", tornado: "\uD83C\uDF2A\uFE0F", wildfire: "\uD83D\uDD25", heatWave: "\uD83C\uDF21\uFE0F", hail: "\uD83E\uDDCA", earthquake: "\uD83C\uDFD4\uFE0F", lightning: "\u26A1", strongWind: "\uD83D\uDCA8", drought: "\uD83C\uDF3E", coldWave: "\u2744\uFE0F" };
                    const labels = { flood: "Flooding", hurricane: "Hurricane", tornado: "Tornado", wildfire: "Wildfire", heatWave: "Heat Wave", hail: "Hail", earthquake: "Earthquake", lightning: "Lightning", strongWind: "Strong Wind", drought: "Drought", coldWave: "Cold Wave" };
                    return <RiskRow key={key} icon={icons[key] || "\u26A0\uFE0F"} label={labels[key] || key} rating={h?.rating} detail={h?.detail} />;
                  })}
                </div>
              </Section>
            )}

            {/* FLOOD */}
            {d.flood && (
              <Section icon="\uD83C\uDF0A" title="Flood Risk & Insurance" subtitle="FEMA NFIP flood zone and claims data">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                  <StatCard label="Flood Zone" value={d.flood.floodZone || "N/A"} sub={d.flood.floodZoneDesc} color={d.flood.floodZone === "X" ? THEME.green : THEME.red} />
                  <StatCard label="County Claims" value={fmtNum(d.flood.historicalClaimsInCounty)} sub="Historical NFIP claims" color={THEME.amber} />
                  <StatCard label="Insurance" value={d.flood.floodInsuranceRecommended ? "Recommended" : "Optional"} sub={d.flood.floodInsuranceRecommended ? "High flood risk area" : "Minimal flood hazard"} color={d.flood.floodInsuranceRecommended ? THEME.red : THEME.green} />
                </div>
              </Section>
            )}

            {/* ENVIRONMENT */}
            {d.environment && (
              <Section icon="\uD83C\uDFED" title="Environmental & Contamination" subtitle="EPA Superfund, Brownfields, Toxic Release Inventory">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                  <StatCard label="Superfund Sites" value={d.environment.superfundSitesNearby ?? "\u2014"} sub="Within 3 miles" color={d.environment.superfundSitesNearby > 0 ? THEME.red : THEME.green} />
                  <StatCard label="Brownfield Sites" value={d.environment.brownfieldsNearby ?? "\u2014"} sub="Within 3 miles" color={d.environment.brownfieldsNearby > 2 ? THEME.amber : THEME.green} />
                  <StatCard label="TRI Facilities" value={d.environment.triSitesNearby ?? "\u2014"} sub="Toxic Release Inventory" color={d.environment.triSitesNearby > 5 ? THEME.amber : THEME.green} />
                </div>
                {d.environment.nearestBrownfield && (
                  <div style={{ background: THEME.amberBg, borderRadius: 8, padding: 12, fontSize: 12, color: THEME.text }}>
                    <strong>Nearest brownfield:</strong> {d.environment.nearestBrownfield.name} — {d.environment.nearestBrownfield.distance} ({d.environment.nearestBrownfield.status})
                  </div>
                )}
              </Section>
            )}

            {/* NEIGHBOURHOOD */}
            {d.census && (
              <Section icon="\uD83C\uDFD8\uFE0F" title="Neighbourhood Profile" subtitle="Census ACS 5-Year Estimates">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Housing</div>
                    <DataRow label="Median Home Value" value={fmt(d.census.medianHomeValue)} />
                    <DataRow label="Median Rent" value={d.census.medianRent ? `${fmt(d.census.medianRent)}/mo` : "N/A"} />
                    <DataRow label="Total Housing Units" value={fmtNum(d.census.totalHousingUnits)} />
                    <DataRow label="Owner Occupied" value={fmtPct(d.census.ownerOccupiedPct)} />
                    <DataRow label="Renter Occupied" value={fmtPct(d.census.renterOccupiedPct)} />
                    <DataRow label="Vacancy Rate" value={fmtPct(d.census.vacancyRate)} />
                    <DataRow label="Median Year Built" value={d.census.medianYearBuilt || "N/A"} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Demographics & Economy</div>
                    <DataRow label="Population" value={fmtNum(d.census.population)} />
                    <DataRow label="Median Household Income" value={fmt(d.census.medianIncome)} />
                    <DataRow label="Income-to-Home Ratio" value={d.census.medianIncome && d.census.medianHomeValue ? `${(d.census.medianHomeValue / d.census.medianIncome).toFixed(1)}x` : "N/A"} />

                    {d.census.medianIncome && d.census.medianHomeValue && (() => {
                      const ratio = d.census.medianHomeValue / d.census.medianIncome;
                      const aff = ratio < 4 ? "Affordable" : ratio < 6 ? "Moderate" : "Stretched";
                      const bg = ratio < 4 ? THEME.greenBg : ratio < 6 ? THEME.amberBg : THEME.redBg;
                      const col = ratio < 4 ? THEME.green : ratio < 6 ? THEME.amber : THEME.red;
                      return (
                        <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: bg }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: col }}>Affordability: {aff}</div>
                          <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 2 }}>
                            Home price is {ratio.toFixed(1)}x median income (under 4x is generally affordable)
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </Section>
            )}

            {/* SCHOOLS */}
            {d.schools && (
              <Section icon="\uD83C\uDF93" title="Schools Nearby" subtitle="NCES school data">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { label: "Elementary", data: d.schools.nearestElementary },
                    { label: "Middle", data: d.schools.nearestMiddle },
                    { label: "High School", data: d.schools.nearestHigh },
                  ].filter(s => s.data).map((s, i) => (
                    <div key={i} style={{ flex: "1 1 200px", background: THEME.bg, borderRadius: 8, padding: 12, border: `1px solid ${THEME.border}` }}>
                      <div style={{ fontSize: 10, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 0.8, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: THEME.text }}>{s.data.name}</div>
                      <div style={{ fontSize: 11, color: THEME.textMuted }}>{s.data.distance}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* DATA SOURCES */}
            <div style={{ background: THEME.card, border: `1px solid ${THEME.cardBorder}`, borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: THEME.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Data Sources — All Free, All Public</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(d.dataSources || ["Census Bureau ACS", "FEMA NRI", "EPA Envirofacts", "FEMA NFIP"]).map((s, i) => (
                  <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 12, background: THEME.accentLight, color: THEME.accent, fontWeight: 600 }}>{"\u2713"} {s}</span>
                ))}
              </div>
              <div style={{ fontSize: 10, color: THEME.textDim, marginTop: 10 }}>
                Report generated via web search against live federal data sources. All data is publicly available at zero cost.
                {d.generatedAt && ` Generated: ${new Date(d.generatedAt).toLocaleDateString()}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
