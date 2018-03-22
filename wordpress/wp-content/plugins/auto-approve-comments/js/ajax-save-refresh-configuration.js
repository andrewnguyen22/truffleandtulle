(function($) {
	
	$( document ).on( 'click', '#aac-submit', function() {

		$( '#aac-notice-success' ).fadeOut(200);
		$( '#aac-notice-error' ).fadeOut(200);

		var data = {
			action: 'aac_ajax_save_configuration',
			nonce: $('#aac-save-configuration-nonce').val(),
			commenters: $('#aac-commenters-list').val(),
			usernames: $('#aac-usernames-list').val(),
			roles: $('#aac-roles-list').val()
		}

		$.ajax({
			url: auto_approve_comments_ajax_params.ajaxurl,
			type: 'post',
			data: data,
			success: function( response ) {

				$( '#aac-notice-success' ).fadeIn(500);

				var data = {
					action: 'aac_ajax_refresh_configuration'
				}

				$.ajax({
					url: auto_approve_comments_ajax_params.ajaxurl,
					type: 'post',
					data: data,
					success: function( response ) {

						$('#aac-commenters-list').val( response['commenters'] );
						$('#aac-usernames-list').val( response['usernames'] );
						$('#aac-roles-list').val( response['roles'] );

					}
				})

			},
			error: function() {

				console.log("form submission error");
               $( '#aac-notice-error' ).fadeIn(500);

			}

		})
	})
	
})( jQuery );