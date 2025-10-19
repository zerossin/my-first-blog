// Masonry 레이아웃 초기화
(function() {
	function initMasonry() {
		var grid = document.querySelector('.masonry-grid');
		if (!grid || typeof Masonry === 'undefined') return;

			var msnry = new Masonry(grid, {
			itemSelector: '.masonry-grid-item',
			columnWidth: '.masonry-grid-sizer',
			percentPosition: true,
				horizontalOrder: true // 가능한 한 좌→우 순서 유지
		});

		// 이미지 로딩 완료 후 재계산
		if (typeof imagesLoaded !== 'undefined') {
			imagesLoaded(grid, function() { msnry.layout(); });
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMasonry);
	} else {
		initMasonry();
	}
})();