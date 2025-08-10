<template>
	<div class="bottom-container">
		<div class="background-image"></div>
		<div id="content">
            <div v-if="loading">
				<h1>Loading user data...</h1>
			</div>
			<div v-else-if="error">
				<h1>Error: Failed to fetch user data</h1>
				<p>{{ error }}</p>
			</div>
			<div v-else-if="userData">
				<h1>Welcome Back, {{ userData.username }}</h1>
				<button @click="logoutAccount">logout</button>
			</div>
            <div v-else>
                <h1>Not logged in</h1>
            </div>
		</div>
	</div>
</template>

<style lang="css" scoped>
.bottom-container {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
#content {
	background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 32px;
	border-radius: 16px;
}
</style>

<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env['VITE_API_URL'];
const router = useRouter();

export default {
	setup() {
		const loading = ref(true);
		const error = ref<string | null>(null);
		const userData = ref<any | null>(null);

		const fetchUserData = async () => {
			loading.value = true;
			error.value = null;
			
			try {
				const res = await axios.get(`${BASE_URL}/user/`, {
					withCredentials: true
				});
				userData.value = res.data;
			} catch (e: any) {
                console.error("Error fetching user data:", e);
				error.value = e.response?.data?.message || e.message || "An unknown error occurred.";
			} finally {
				loading.value = false;
			}
		};

		const logoutAccount = async () => {
			try {
				await axios.post(`${BASE_URL}/auth/logout`, {}, {
					withCredentials: true
				});
				window.location.reload();
			} catch (e) {
				console.error("Error logging out:", e);
				window.location.reload();
			}
		}

		// This hook runs after the component is mounted
		onMounted(fetchUserData);

		return {
			loading,
			error,
			userData,
			logoutAccount
		};
	}
}
</script>