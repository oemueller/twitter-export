// copy parameters like token from a fetch request in your network panel

export const fetchPeopleIFollow = ({ token, userId, transactionId, csrfToken }) => {
  const results = [];

  const fetchNextPage = async (cursor) => {
    console.log("fetchNextPage ...", cursor ? cursor : "");
    const cursorVar = cursor ? `,"cursor":"${cursor}"` : "";
    const variables = `{"userId":"${userId}","count":20,"includePromotedContent":false${cursorVar}}`;
    const features =
      '{"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":true,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"rweb_video_timestamps_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}';
    const res = await fetch(
      `https://twitter.com/i/api/graphql/2vUj-_Ek-UmBVDNtd8OnQA/Following?variables=${encodeURIComponent(
        variables
      )}&features=${encodeURIComponent(features)}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "de,en-US;q=0.9,en;q=0.8",
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
          "sec-ch-ua": '"Chromium";v="121", "Not A(Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-client-transaction-id": transactionId,
          "x-csrf-token": csrfToken,
          "x-twitter-active-user": "yes",
          "x-twitter-auth-type": "OAuth2Session",
          "x-twitter-client-language": "de",
        },
        referrer: "https://twitter.com",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const json = await res.json();
    const entries = json.data.user.result.timeline.timeline.instructions.find(
      (i) => i.type.includes("TimelineAddEntries")
    ).entries;

    results.push(entries.slice(0, -2));

    const bottomEntry = entries.find((e) =>
      e.entryId?.includes("cursor-bottom-")
    );

    // find bottom cursor, if exists fetch with cursor until no cursor found
    if (bottomEntry && entries.length > 2) {
      fetchNextPage(bottomEntry.content.value);
    } else {
      const people = results.flat().map((r) => ({
        name: r.content.itemContent.user_results.result.legacy.name,
        screen_name:
          r.content.itemContent.user_results.result.legacy.screen_name,
        profile_banner_url:
          r.content.itemContent.user_results.result.legacy.profile_banner_url,
        followers_count:
          r.content.itemContent.user_results.result.legacy.followers_count,
        created_at: r.content.itemContent.user_results.result.legacy.created_at,
        entities: r.content.itemContent.user_results.result.legacy.entities,
        url: r.content.itemContent.user_results.result.legacy.url,
      }));
      console.log(
        "Here are the results sorted by follower count: ",
        people.sort((a, b) => b.followers_count - a.followers_count)
      );
    }
  };

  fetchNextPage();
};
