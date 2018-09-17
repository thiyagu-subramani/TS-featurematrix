# E2E Environment Template Repository 

This EJ2 E2E Testing pre configured template repository.

## GuideLines

You can follow the same guidelines for this repository also.

[https://syncfusion.atlassian.net/wiki/spaces/EJ2/pages/186380868/E2E+Guidelines+and+Configurations](https://syncfusion.atlassian.net/wiki/spaces/EJ2/pages/186380868/E2E+Guidelines+and+Configurations)

## Testing Angular Application 

Before testing angular application please add the below line in top of the spec file

```
browser.waitForAngularEnabled = true;
```

## QA

[https://syncfusion.atlassian.net/wiki/spaces/EJ2/pages/666828890/E2E+Protractor+Selenium+QA](https://syncfusion.atlassian.net/wiki/spaces/EJ2/pages/666828890/E2E+Protractor+Selenium+QA)

## Running Application 

Run the below command in command prompt.

```
gulp e2e-ci-test
```
