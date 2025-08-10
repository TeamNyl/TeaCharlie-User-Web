<template>
	<main class="center-container">
		<div class="background-image" />
		<div class="login-content">
			<header>
				<h1 class="title"> {{ $t('login.label_login') }}</h1>
			</header>
			<div class="auth-content">
				<div class="input-fields">
					<div class="input-group">
						<label for="username">{{ $t('login.label_username') }}</label>
						<input type="text" autocomplete="username" id="username" name="username" class="field-input" v-model="username" required />
					</div>

					<div class="input-group">
						<label for="password">{{ $t('login.label_password') }}</label>
						<input type="password" autocomplete="current-password" id="password" name="password" class="field-input" v-model="pass" required />
					</div>
				</div>
				<button @click="login" id="login" class="primary">{{ $t('login.action_login') }}</button>
				<nav class="auth-links">
					<p>{{ $t('login.label_no_account_ques') }} <a href="/signup">{{ $t('login.action_sign_up') }}</a></p>
					<p><a href="/forgot-password">{{ $t('login.action_i_forgot_my_password') }}</a></p>
				</nav>
			</div>
		</div>
	</main>
</template>

<style scoped>
.center-container {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.login-content {
	position: relative;
	z-index: 1;
	height: auto;
	width: 100%;
	max-width: 400px;
	background-color: #fff;
	border: 2px solid #000;
	box-shadow: 10px 10px;
	padding: 2rem;
}

.login-content {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.auth-content {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
}

.title {
	font-size: 3rem;
	padding: 0;
	margin: 0;
	text-align: center;
}

.input-group {
	display: flex;
	flex-direction: column;
}

</style>

<script lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const BASE_URL = import.meta.env['VITE_API_URL'];
const router = useRouter();

export default {
	setup() {

		const username = ref("");
		const pass = ref("");

		const login = async () => {
			axios.post(`${BASE_URL}/auth/login`,
				{
					"identifier": username.value,
					"password": pass.value
				}, {
					withCredentials: true,
				}
			).then(() => {
				window.location.reload();
			}).catch((e) => {
				console.log(e)
			})

		}

		return { login, username, pass };
	}
}
</script>