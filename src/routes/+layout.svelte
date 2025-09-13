<script lang="ts">
	import '../app.css';
	import { Footer } from '$lib/components/ui/footer';

	import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from 'svelte-clerk';
	import { setupConvex, useConvexClient } from 'convex-svelte';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';

	let { data, children } = $props();
	let { roles, token } = $derived(data);
	console.log('roles', roles);

	setupConvex(PUBLIC_CONVEX_URL);
	const convexClient = useConvexClient();
	convexClient.setAuth(async () => token);
</script>

<ClerkProvider>
	<div
		class="inset-0 h-full w-full bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
	>
		<div class="mx-auto max-w-5xl px-6 py-8">
			<div class="border border-black bg-white shadow-sm">
				<header class="px-6 py-4">
					<div class="border-b-1 border-black bg-white font-mono uppercase">
						<div class="grid grid-cols-2 items-center py-2">
							<nav class="flex gap-2 text-xs">
								<a
									href="/"
									class="border border-black px-10 py-1 hover:bg-black hover:text-white active:bg-white active:text-black"
									>Home</a
								>
								<SignedIn>
									{#if roles?.includes('admin')}
										<a
											href="/admin"
											class="border border-black px-10 py-1 hover:bg-black hover:text-white active:bg-white active:text-black"
											>Admin</a
										>
									{/if}
								</SignedIn>
							</nav>

							<div class="flex justify-end gap-2 text-xs">
								<SignedIn>
									<UserButton />
								</SignedIn>
								<SignedOut>
									<SignInButton
										class="cursor-pointer border border-black px-10 py-1 hover:bg-green-700 hover:text-white active:bg-white active:text-black"
									></SignInButton>
								</SignedOut>
							</div>
						</div>
					</div>
				</header>

				<main class="bg-white px-6">
					{@render children()}
				</main>

				<footer class="mt-8 bg-white px-6 pb-4">
					<div class=" mt-6 border-t border-black pt-4 pb-4">
						<div class="flex justify-between text-xs">
							<span>F1=HELP</span>
							<span>F3=EXIT</span>
							<span>F9=PRINT</span>
							<span>F12=CANCEL</span>
						</div>
					</div>
					<Footer />
				</footer>
			</div>
		</div>
	</div>
</ClerkProvider>
