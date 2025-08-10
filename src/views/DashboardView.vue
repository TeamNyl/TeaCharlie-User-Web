<template>
	<button @click="logoutAccount">logout</button>
</template>

<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';

const BASE_URL = import.meta.env['VITE_API_URL'];
const router = useRouter();

export default {
	setup() {
		const logoutAccount = async () => {
			try {
				await axios.post(`${BASE_URL}/auth/logout`, {}, {
					withCredentials: true
				});
				router.push('/login');
			} catch (e) {
				console.error("Error logging out:", e);
				router.push('/login');
			}
		}
		return { logoutAccount };
	}
}
</script>