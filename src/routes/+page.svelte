<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import date from '$lib/components/date';
	const defaultChart = 'https://charts.jetstack.io';

	interface IRepo {
		chart: string;
		home: string;
		description: string;
		icon: string;
		source: string;
		versions: {
			version: string;
			created: string;
		}[];
	}

	const repos: IRepo[] = [];
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

<div class="columns is-multiline is-mobile">
	{#each repos as repo}
		<div class="column is-3-desktop">
			<Card title={repo.chart} subtitle={repo.description} img={repo.icon}>
				<div class="select is-fullwidth">
					<select>
						{#each repo.versions as item, key}
							<option value={key}>
								{item.version} - {date(item.created, 'DATETIME_MED')}
							</option>
						{/each}
					</select>
				</div>
			</Card>
		</div>
	{/each}
</div>
