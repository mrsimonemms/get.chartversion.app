<script lang="ts">
	export let title;
	export let img;
	export let subtitle;
</script>

<div class="card">
	<div class="card-image">
		<figure class="image">
			<img src={img} alt={title} />
		</figure>
	</div>

	<div class="card-content">
		<div class="media">
			<div class="media-content">
				<p class="title is-4">{title}</p>
				<p class="subtitle is-6">{subtitle}</p>
			</div>
		</div>

		<div class="content">
			<slot />
		</div>
	</div>
</div>
