<?php

require_once '../PHPToolkit/NetSuiteService.php';

$service = new NetSuiteService();
$service->useRequestLevelCredentials(false);

$params = new GetDataCenterUrlsRequest();
$params->account = NS_ACCOUNT;
$response = $service->getDataCenterUrls($params);
$webservicesDomain = $response->getDataCenterUrlsResult->dataCenterUrls->webservicesDomain;

$service->setHost($webservicesDomain);
$service->useRequestLevelCredentials(true);

$customer = new Customer();
$customer->lastName = "Doe";
$customer->firstName = "John";
$customer->companyName = "ABC company X";
$customer->phone = "123456789";

$request = new AddRequest();
$request->record = $customer;

$addResponse = $service->add($request);

if (!$addResponse->writeResponse->status->isSuccess) {
    echo "ADD ERROR";
} else {
    echo "ADD SUCCESS, id " . $addResponse->writeResponse->baseRef->internalId;
}

?> 

