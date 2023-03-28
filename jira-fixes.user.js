// ==UserScript==
// @name        Jira Fixes
// @namespace   com.teddywing
// @description Various fixes for Jira
// @version     0.0.1
// @match       https://*.atlassian.net/*
// @run-at      document-end
// @grant       none
// ==/UserScript==

// Copyright (c) 2022  Teddy Wing
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.


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
			observer.disconnect();
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
