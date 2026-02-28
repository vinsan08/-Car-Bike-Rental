export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export async function post(endpoint: string, data: any, token?: string) {
    const authToken = token || localStorage.getItem("token");
    const resp = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify(data)
    });
    return resp.json();
}

export async function get(endpoint: string, token?: string) {
    const authToken = token || localStorage.getItem("token");
    const resp = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        }
    });
    return resp.json();
}

export async function put(endpoint: string, data: any, token?: string) {
    const authToken = token || localStorage.getItem("token");
    const resp = await fetch(`${API_BASE}${endpoint}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify(data)
    });
    return resp.json();
}
