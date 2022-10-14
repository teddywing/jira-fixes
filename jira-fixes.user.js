// ==UserScript==
// @name        Jira Fixes
// @namespace   com.teddywing
// @description Various fixes for Jira
// @version     0.0.1
// @match       https://*.atlassian.net/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

function focus_left_content_column_v1 () {
	var left_column_content = document.querySelector(
		'[data-testid="issue.views.issue-details.issue-layout.container-left"]'
	);
	left_column_content.focus();
}

function focus_left_content_column () {
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

focus_left_content_column();
