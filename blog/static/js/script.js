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

			function enableCardClick() {
				var items = document.querySelectorAll('.post.is-clickable');
			items.forEach(function(item) {
				item.addEventListener('click', function(e) {
					// 내부 a 태그 클릭은 기본 링크 동작 유지
					if (e.target.closest('a')) return;
					var href = item.getAttribute('data-href');
					if (href) { window.location.href = href; }
				});
			});
		}

	if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', function(){
				initMasonry();
				enableCardClick();
			});
	} else {
			initMasonry();
			enableCardClick();
	}
})();