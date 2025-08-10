<template>
	<main class="container">
		<div class="background-image" />
		<div class="login-content">
			<header>
				<h1 class="title">Login</h1>
			</header>
			<div class="auth-content">
				<div class="input-fields">
					<div class="input-group">
						<label for="username">Username</label>
						<input type="text" id="username" name="username" class="field-input" v-model="username" required />
					</div>

					<div class="input-group">
						<label for="password">Password</label>
						<input type="password" id="password" name="password" class="field-input" v-model="pass" required />
					</div>
				</div>
				<button @click="login" id="login">Login</button>
				<nav class="auth-links">
					<p>No account? <a href="/signup">Sign up</a></p>
					<p><a href="/forgot-password">I forgot my password</a></p>
				</nav>
			</div>
		</div>
	</main>
</template>

<style scoped>
.container {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.background-image {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url(https://static.teacharlie.com/5df6221ca43e0a04e49bb4ccf290dfe4.jpg) no-repeat center;
	background-size: cover;
	filter: blur(5px);
	z-index: -1;
	background-color: #c1eae6;
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

label {
	font-size: 1.2rem;
	margin-bottom: 0.5rem;
}

input.field-input {
	border: 3px solid #000;
	width: 100%;
	padding: 0.75rem;
	font-size: 1rem;
	box-sizing: border-box;
}

.input-fields {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 0;
	border: none;
}

button {
	padding: 1rem;
	font-size: 1rem;
	border: none;
	background-color: var(--foliage-color);
	color: #fff;
	cursor: pointer;
}

button:hover {
	background-color: var(--foliage-dark);
}

p {
	text-align: center;
	margin: 0 0;
}

a {
	color: var(--foliage-color);
	transition: color 0.1s ease-in-out;
	text-decoration: none;
}

a:hover {
	color: #000;
	text-decoration: underline;
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
				router.push('/')
			}).catch((e) => {
				console.log(e)
			})

		}

		return { login, username, pass };
	}
}
</script>