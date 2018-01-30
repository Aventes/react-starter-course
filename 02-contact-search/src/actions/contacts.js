/*
 * Copyright (c) 2018. Tideworks Technology, Inc.
 */
/**
 * @author maksym.yurin (myurin)
 * @since 0.11
 */
import {TestContacts} from '../testData/Contacts_TEST_DATA.js'

export const loadAllContacts = () => {
    let contacts = TestContacts;

    return new Promise(function (resolve) {
        setTimeout(
            () => resolve(contacts)
            , 1000);
    });
};