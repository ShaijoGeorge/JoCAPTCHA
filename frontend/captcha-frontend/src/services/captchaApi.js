export const API_BASE = "http://127.0.0.1:8000";

export async function generateChallenge() {
    const res = await fetch(`${API_BASE}/challenge/generate`);
    return res.json();
}

export async function verifyChallenge(body) {
    const res = await fetch(`${API_BASE}/challenge/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return res.json();
} 

export async function getSettings() {
    const res = await fetch(`${API_BASE}/admin/settings`);
    return res.json();
}

export async function saveSettings(settings) {
    const res = await fetch(`${API_BASE}/admin/settings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
    });
    return res.json();
}