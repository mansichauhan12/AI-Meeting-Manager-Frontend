const API_HOST =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

let isRefreshing = false;

async function refreshAccessToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) return null;

    try {
        const response = await fetch(`${API_HOST}/auth/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access", data.access);
            return data.access;
        }

        return null;
    } catch (error) {
        return null;
    }
}

export default async function callAPI(
    method,
    route,
    body = null,
    signal = null,
    extraConfig = {}
) {
    let access = localStorage.getItem("access");

    // const makeRequest = async (token) => {
    //     const headers = {
    //         "Content-Type": "application/json",
    //     };

    //     if (token) {
    //         headers.Authorization = `Bearer ${token}`;
    //     }

    //     const config = {
    //         method,
    //         headers,
    //         ...(body && { body: JSON.stringify(body) }),
    //         ...(signal ? { signal } : {}),
    //         ...extraConfig,
    //     };

    //     const response = await fetch(`${API_HOST}/${route}`, config);

    //     const data = await response.json().catch(() => ({}));

    //     return {
    //         status: response.status,
    //         ok: response.ok,
    //         data,
    //     };
    // };

    const makeRequest = async (token) => {

        const headers = {};

        // FormData nahi hai tabhi JSON header lagao
        if (!(body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
            ...(signal ? { signal } : {}),
            ...extraConfig,
        };

        if (body) {
            if (body instanceof FormData) {
                config.body = body;
            } else {
                config.body = JSON.stringify(body);
            }
        }

        const response = await fetch(
            `${API_HOST}/${route}`,
            config
        );

        const data = await response.json().catch(() => ({}));

        return {
            status: response.status,
            ok: response.ok,
            data,
        };
    };
    let result = await makeRequest(access);

    if (result.status === 401 && !isRefreshing) {
        isRefreshing = true;

        const newAccess = await refreshAccessToken();

        isRefreshing = false;

        if (newAccess) {
            result = await makeRequest(newAccess);
        } else {
            localStorage.clear();
            window.location.href = "/login";
        }
    }

    return result;
}