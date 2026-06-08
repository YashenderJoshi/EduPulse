const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiLogin(email: string, password: string) {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const res = await fetch(`${API_BASE_URL}/auth/student/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Invalid credentials');
    }

    return res.json(); // { access_token, token_type }
}

export async function apiGetMe(token: string) {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error('Unauthorized');
    }

    return res.json();
}
