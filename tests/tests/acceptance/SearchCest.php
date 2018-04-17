<?php


class SearchCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/');
//        $I->fillField(['id' => 'add-new-query-input'], 'qwerty');
//        $I->click('add-new-query-button');
//        $I->seeElement(['id' => 'loading-bar-wrapper']);
//        $I->wait(30);
//        $I->see('qwerty');
    }
}
