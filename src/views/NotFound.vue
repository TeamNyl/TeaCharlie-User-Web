<script setup lang="ts">
import { ref } from 'vue';
import { isAuthenticated } from '@/auth';

const isLoggedIn = ref<boolean | null>(null);

(async () => {
	isLoggedIn.value = await isAuthenticated();
})();
</script>

<template>
<div id="content">
	<div>
		<img />
		<div>
			<h1>
				{{ $t('404.heading_not_found') }}
			</h1>
			<div v-if="isLoggedIn === null">
				<p>{{ $t('404.indicator_loading') }}</p>
			</div>
			<div v-else-if="isLoggedIn === true">
				<p>
                    {{ $t('404.label_go_to') }} 
                    <a href="/">
                        {{ $t('404.action_dashboard_link') }}
                    </a>
                </p>
			</div>
			<div v-else>
				<p>
                    {{ $t('404.label_go_to') }} 
                    <a href="/login">
                        {{ $t('404.action_login_link') }}
                    </a>
                </p>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
#content {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
h1 {
	font-size: 4rem;
}
</style>