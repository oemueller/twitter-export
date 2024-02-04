# Twitter people export

Export all people I follow on Twitter (nah, X).

Sadly there is no option to do it via Twitter UI directly and it's also not included in Twitters data export feature.

Also I don't want to use a Twitter Dev account to be able to use the API.

## How to

Just call fetchPeopleIFollow with all required parameters. (Get the parameters from the network panel after you have logged into Twitter.

```
fetchPeopleIFollow({
  token: "",
  userId: xxx,
  transactionId: "",
  csrfToken: "",
  path: "" // random path for 'graphql/${path}/Following' - taken also from network panel
});
```

The result array will have this structure: 
```
[{
    "name": "NASA",
    "screen_name": "NASA",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/11348282/1705526717",
    "followers_count": 78972771,
    "created_at": "Wed Dec 19 20:20:32 +0000 2007",
    "url": "https://t.co/9NkQJKAnuU"
},
{
    "name": "X",
    "screen_name": "X",
    "profile_banner_url": "https://pbs.twimg.com/profile_banners/783214/1690175171",
    "followers_count": 67464015,
    "created_at": "Tue Feb 20 14:35:54 +0000 2007",
    "url": "https://t.co/bGcvaMApJO"
}]

```
