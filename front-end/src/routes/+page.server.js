// @ts-nocheck
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import { redirect } from '@sveltejs/kit';
import { jwt_verify } from '$lib/hooks/auth';
// import MDI from '@mdi/js';

export const prerender = true;

export async function load({ fetch, params, cookies }) {
    const jwt_token = cookies.get('jwt_token');
    const decoded = await jwt_verify({ jwt_token });
    if (decoded.error) {
        throw redirect(307, '/login');
    }

    const res = await fetch(`/api/dashboard/get`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt_token}`,
        },
    });

    // let iconPath = MDI['mdiGithub'];
    // console.log(iconPath);

    const dashboard = await res.json();

    return dashboard;
}
