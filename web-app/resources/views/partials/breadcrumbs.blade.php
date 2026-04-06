@props(['items' => []])
<nav aria-label="breadcrumb" class="mb-3">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="{{ route('home') }}">Inicio</a></li>
    @foreach($items as $item)
      @if(!$loop->last)
        <li class="breadcrumb-item"><a href="{{ $item['url'] }}">{{ $item['label'] }}</a></li>
      @else
        <li class="breadcrumb-item active" aria-current="page">{{ $item['label'] }}</li>
      @endif
    @endforeach
  </ol>
</nav>
