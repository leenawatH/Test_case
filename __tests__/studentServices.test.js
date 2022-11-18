const express = require("express"),
app = express(),
router = require("../routes/studentServiceRoutes"), request = require("supertest"); 
const { query } = require("express");
const puppeteer = require('puppeteer');
app.use("/", router);

test("Test: GET /", async () => {
const res = await request(app).get("/"); expect(res.body).toEqual({ error: true, message: "hello" });
});

test("Test: GET all students via /students", async () => {
            const res = await request(app).get("/students"); 
            expect(res.body.data).toEqual([
            {
                STU_ID: 1,
                STU_FNAME: "Andrew",
                STU_LNAME: "Black",
                STU_AGE: 25,
            },
            {
                STU_ID: 2,
                STU_FNAME: "Alexandra",
                STU_LNAME: "Brown",
                STU_AGE: 25,  
            },
            {
                STU_ID: 3,
                STU_FNAME: "Amanda",
                STU_LNAME: "Davidson",
                STU_AGE: 25,  
            },
            {
                STU_ID: 4,
                STU_FNAME: "Benjamin",
                STU_LNAME: "Duncan",
                STU_AGE: 25,  
            },
            {
                STU_ID: 5,
                STU_FNAME: "Christopher",
                STU_LNAME: "Ellison",
                STU_AGE: 25,  
            }
            ]);
});

test("Test: Get the information of the student via /student/:id", async () => {
    let student_data = {
                STU_ID: 4,
                STU_FNAME: "Benjamin",
                STU_LNAME: "Duncan",
                STU_AGE: 25,  
            };
            
        const res = await request(app).get(`/student/4`); 
        expect(res.body.data).toEqual(student_data);
        });

describe("Test: Getting information of the first student in database with /students and /student/:id", () => {
    let firstStudent;
    test("Test: GET all students via /students", async () => {
    const res = await request(app).get("/students"); 
    expect(res.body.data).toEqual([
    {
        STU_ID: 1,
        STU_FNAME: "Andrew",
        STU_LNAME: "Black",
        STU_AGE: 25,
    },
    {
        STU_ID: 2,
        STU_FNAME: "Alexandra",
        STU_LNAME: "Brown",
        STU_AGE: 25,  
    },
    {
        STU_ID: 3,
        STU_FNAME: "Amanda",
        STU_LNAME: "Davidson",
        STU_AGE: 25,  
    },
    {
        STU_ID: 4,
        STU_FNAME: "Benjamin",
        STU_LNAME: "Duncan",
        STU_AGE: 25,  
    },
    {
        STU_ID: 5,
        STU_FNAME: "Christopher",
        STU_LNAME: "Ellison",
        STU_AGE: 25,  
    }
    ]);
    firstStudent = res.body.data[0];
    });
    test("Test: Get the information of the first student via /student/:id", async () => {
    const res = await request(app).get(`/student/${firstStudent.STU_ID}`); 
    expect(res.body.data).toEqual(firstStudent);
    }); });

test("Test: Getting the information of student through the user interface.", async () => {

    const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    args: ["--window-size=1920,1080"],
    executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", });

    const page = await browser.newPage();

    await page.goto("http://localhost:3100/");
 
    await page.click("input#STU_ID"); await page.type("input#STU_ID", "2");

    page.on("dialog", async (dialog) => { await dialog.accept();
    });
  

    await page.click("input#select"); 
    
    const studentObject_select = await page.evaluate(() => { return {
        firstName: document.getElementById("STU_FNAME").value, lastName: document.getElementById("STU_LNAME").value, age: document.getElementById("STU_AGE").value,
        };
        });
        expect(studentObject_select).toEqual({
        firstName: "Alexandra",
        lastName: "Brown",
        age: "25",
        });
    
        


        }, 20000);


describe("Test: Insert , Update and Delete the information of student through the user interface.", () => {
   
    test("Test: Getting the information of student through the user interface.", async () => {

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            args: ["--window-size=1920,1080"],
            executablePath:
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", });

        const page = await browser.newPage();

        await page.goto("http://localhost:3100/");

   
        // test insert new student {ID : 6 , FNAME : "Lenawat" , LNAME : "Honglerdpakul" , AGE = 20} 

        await page.click("input#STU_ID"); await page.type("input#STU_ID", "6");
        await page.click("input#STU_FNAME"); await page.type("input#STU_FNAME", "Lenawat");
        await page.click("input#STU_LNAME"); await page.type("input#STU_LNAME", "Honglerdpakul");
        await page.click("input#STU_AGE"); await page.type("input#STU_AGE", "20");
        page.on("dialog", async (dialog) => { await dialog.accept();
        });

        await page.click("input#insert");
        
        const res = await request(app).get("/students"); 
        let data = res.body.data.length-1;
        expect(res.body.data[data]).toEqual(
                {
                    STU_ID: 6,
                    STU_FNAME: "Lenawat",
                    STU_LNAME: "Honglerdpakul",
                    STU_AGE: 20,
                },
        );});
    
    
    // test update student's data {ID : 6 , FNAME : "Leenawat" , LNAME : "Honglerdnapakul" , AGE = 20} 
    test("Test: Update the information of student through the user interface.", async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            args: ["--window-size=1920,1080"],
            executablePath:
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", });
        const page = await browser.newPage();
        await page.goto("http://localhost:3100/");
        await page.click("input#STU_ID"); await page.type("input#STU_ID", "6");
        await page.click("input#STU_FNAME"); await page.type("input#STU_FNAME", "Leenawat");
        await page.click("input#STU_LNAME"); await page.type("input#STU_LNAME", "Honglerdnapakul");
        await page.click("input#STU_AGE"); await page.type("input#STU_AGE", "20");
        page.on("dialog", async (dialog) => { await dialog.accept();
        });
        await page.click("input#update");
        const res = await request(app).get("/students"); 
        let data = res.body.data.length-1;
        expect(res.body.data[data]).toEqual(
                {
                    STU_ID: 6,
                    STU_FNAME: "Leenawat",
                    STU_LNAME: "Honglerdnapakul",
                    STU_AGE: 20,
                },
        );
    })

    //Test delete the data {ID : 6 } 
    test("Test: Delete the information of student through the user interface.", async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            args: ["--window-size=1920,1080"],
            executablePath:
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", });
        const page = await browser.newPage();
        await page.goto("http://localhost:3100/");
        

        await page.click("input#STU_ID"); await page.type("input#STU_ID", "6");
        page.on("dialog", async (dialog) => { await dialog.accept();
        });

        await page.click("input#delete");
        const res = await request(app).get("/students"); 
        expect(res.body.data.length).toEqual(5);
    });
    }, 20000); 
    
    