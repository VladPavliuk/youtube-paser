<?php


class GetVideosCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    /**
     * @param AcceptanceTester $I
     * @throws Exception
     */
    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/');
        $I->waitForElementVisible(['id' => 'queries-list'], 5);
        $queriesList = $I->grabMultiple('#queries-list span');
        $I->click('#queries-list span:nth-child(' . (array_rand($queriesList) + 1) . ')');
        $I->waitForElementVisible(['class' => 'result-wrapper'], 25);
        $I->dontSee('NaN', '#middle-rating');
        $I->seeElement(['id' => 'show-videos']);
        $I->click(['id' => 'show-videos']);
        $I->waitForElementVisible(['id' => 'videos-table'], 5);
        $I->wait(5);
    }
}
