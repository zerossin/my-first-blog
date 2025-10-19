// Masonry 레이아웃 및 알약 토글 초기화
(function() {
	function initMasonry() {
		var grid = document.querySelector('.masonry-grid');
		if (!grid || typeof Masonry === 'undefined') return;

		var msnry = new Masonry(grid, {
			itemSelector: '.masonry-grid-item',
			columnWidth: '.masonry-grid-sizer',
			percentPosition: true,
			horizontalOrder: true
		});

		// 이미지 로딩 완료 후 재계산
		if (typeof imagesLoaded !== 'undefined') {
			imagesLoaded(grid, function() { msnry.layout(); });
		}

		// 알약 클릭 시 정렬 변경
		var pillOptions = document.querySelectorAll('.pill-option');
		pillOptions.forEach(function(opt) {
			opt.addEventListener('click', function() {
				if (opt.classList.contains('pill-active')) return;
				pillOptions.forEach(function(o){ o.classList.remove('pill-active'); });
				opt.classList.add('pill-active');

				// Masonry 아이템 정렬: 발행일 타임스탬프, 동률 시 PK로 안정 정렬
				var sortType = opt.getAttribute('data-sort');
				var items = Array.from(grid.querySelectorAll('.masonry-grid-item'));
				items.sort(function(a, b) {
					var ap = parseInt(a.getAttribute('data-published') || '0', 10);
					var bp = parseInt(b.getAttribute('data-published') || '0', 10);
					if (ap === bp) {
						var apk = parseInt(a.getAttribute('data-pk') || '0', 10);
						var bpk = parseInt(b.getAttribute('data-pk') || '0', 10);
						return sortType === 'asc' ? apk - bpk : bpk - apk;
					}
					return sortType === 'asc' ? ap - bp : bp - ap;
				});
				items.forEach(function(item){ grid.appendChild(item); });
				msnry.reloadItems();
				msnry.layout();
			});
		});
	}

	function enableCardClick() {
		var items = document.querySelectorAll('.post.is-clickable');
		items.forEach(function(item) {
			item.addEventListener('click', function(e) {
				if (e.target.closest('a')) return;
				var href = item.getAttribute('data-href');
				if (href) { window.location.href = href; }
			});
		});
	}

	// Masonry 아이템에 data-idx 부여(최신순/오래된순 JS 정렬용)
	function setMasonryIdx() {
		var items = document.querySelectorAll('.masonry-grid-item');
		items.forEach(function(item, idx){ item.setAttribute('data-idx', idx); });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function(){
			setMasonryIdx();
			initMasonry();
			enableCardClick();
		});
	} else {
		setMasonryIdx();
		initMasonry();
		enableCardClick();
	}
})();