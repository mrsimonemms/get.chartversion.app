<script lang="ts">
	const defaultChart = 'https://charts.jetstack.io';
</script>

<div class="columns is-mobile">
	<div class="column is-4-desktop is-offset-4-desktop">
		<label class="label" for="search">Enter the Helm repository URL</label>
		<div class="field has-addons has-addons-centered">
			<div class="control is-expanded">
				<input
					id="search"
					class="input"
					type="text"
					placeholder={defaultChart}
				/>
				<p class="help has-text-danger">Some error message</p>
			</div>
			<div class="control">
				<button class="button is-primary">Search</button>
			</div>
		</div>
	</div>
</div>
