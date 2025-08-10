<template>
	<div class="bottom-container">
		<div class="background-image"></div>
		<div id="wrapper">
			<div id="content">
				<aside class="sidebar">
					<ul v-for="page in pages">
						<li> 
							<button>
								{{ $t(`dashboard.label_sidebar_${page}`) }}
							</button>
						</li>
					</ul>
				</aside>
				<hr />
				<main>
					<div v-if="loading">
						<h1>
							{{ $t('dashboard.indicator_loading_user_data') }}
						</h1>
					</div>
					<div v-else-if="error">
						<h1>
							{{ $t('dashboard.indicator_err_loading_user_data') }}
						</h1>
						<p>{{ error }}</p>
					</div>
					<div v-else-if="userData">
						<h1 class="big-heading">
							{{ $t('dashboard.message_welcome_back_comma') }}
							{{ userData.username }}</h1>
						<button @click="logoutAccount" class="danger">
							{{ $t('dashboard.action_log_out') }}
						</button>
					</div>
					<div v-else>
						<h1>{{ $t('dashboard.indicator_not_logged_in') }}</h1>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped>
.bottom-container {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

#wrapper {
	background-color: #fff;
	width: 100%;
	height: 100%;
	margin-top: min(150px, 30vh);
}

#content {
	display: flex;
	flex-direction: row;
	gap: 16px;
	padding: 32px;
	width: min-content;
}

h1 {
	font-size: 3rem;
}

li {
	list-style: none;
}

ul {
	padding: 0;
}

hr {
	width: 1rem;
	opacity: 10%;
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
		type Page = 'basic' | 'gaming';
		const pages: Array<Page> = ['basic', 'gaming'];
		const state: Page = 'basic';
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
			logoutAccount,
			pages
		};
	}
}
</script>