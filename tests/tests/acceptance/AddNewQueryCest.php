<?php


class AddNewQueryCest
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
        $randomString = $this->randomWord();

        $I->fillField(['id' => 'add-new-query-input'], $randomString);
        $I->click(['id' => 'add-new-query-button']);
        $I->waitForText($randomString, 3);
    }

    private function randomWord($length = 6)
    {
        return substr(str_shuffle("qwertyuiopasdfghjklzxcvbnm"), 0, $length);
    }
}
