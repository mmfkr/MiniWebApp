import { Selector } from 'testcafe';

fixture `University Tests`
    .page `http://localhost:3000/`; // Replace with the URL where your app is hosted

test('Test Loading of Universities', async t => {
    // Check if universities are loaded and displayed
    await t.expect(Selector('#universityDisplay').childElementCount).gt(0, 'Universities are displayed');
});

test('Test University Update Functionality', async t => {
    // Click the update button of the first university
    await t.click(Selector('button').withText('Update').nth(0));

    // Fill out and submit the update form
    // Fill out and submit the update form
await t
.typeText('#updateName', 'Updated Name', { replace: true })
.typeText('#updateDepartment', 'Updated Department', { replace: true })
.typeText('#updateLocation', 'Updated Location', { replace: true })
.click(Selector('button').withText('Submit Update'));


    // Add assertions to verify the update
    // For example, check if the update form is hidden after submission
    await t.expect(Selector('#updateForm').visible).notOk();
});