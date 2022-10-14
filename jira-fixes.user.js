// ==UserScript==
// @name        Jira Fixes
// @namespace   com.teddywing
// @description Various fixes for Jira
// @version     0.0.1
// @match       https://*.atlassian.net/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

// On the ticket page, the left content column is not necessarily focused on
// page load. This means that the arrow keys and page up/down don't scroll the
// left content column.
//
// Wait until the left content column is added to the document body and focus
// it.
//
// Not sure yet how to get this to work with Vimium.
function ticket_page_focus_left_content_column () {
	var observer = new MutationObserver(function(mutation_list) {
		for (var i = 0; i < mutation_list.length; i++) {
			var mutation = mutation_list[i];
			var left_column_content = mutation.target.querySelector(
				'[data-testid="issue.views.issue-details.issue-layout.container-left"]'
			);

			if (!left_column_content) {
				continue;
			}

			left_column_content.focus();
		}

	});

	observer.observe(
		document.body,
		{
			childList: true,
			subtree: true
		}
	);
}

ticket_page_focus_left_content_column();
