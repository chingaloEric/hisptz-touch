import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
 Generated class for the HelpProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class HelpProvider {

  constructor() {
  }


  getHelpContents(){
    let helpContent = [{"id":"1.1","name":"Overview","tags":"overview.help","contents":"The android based mobile application (DHIS 2 Touch) aims to ship full dhis2 web experience completely offline on the Android Smartphone for data entry and event capture with capabilities for automatic synchronization via internet or SMS with login instance based on synchronization settings. It combines different DHIS 2 web Apps and Features including Data Entry, Event Capture, Reports, Sync, Dashboard and Settings. DHIS 2 Touch also has Utility Apps such as Profile, About, Help and Logout.","subMenu":[{"id":"1.2","name":"Features of DHIS2","contents":"DHIS2 Touch allows sharing of the HMIS data among Ministries, Departments and Agencies (MDA’s), the Development and Implementing Partners and other Stakeholders for their monitoring, analysis, planning and decision making. Its features can be summarized using the classical definition of the system which comprises of input, process and output.","subMenu":[{"id":"1.2.1","name":"Input","contents":"DHIS2 Touch provides user-friendly interface for users to enter data. The screens for data entry do imitate the paper forms. Essentially, this feature enables entering into the system HMIS data which is collected from Village/Mtaa. "},{"id":"1.2.2","name":"Process","contents":"DHIS2 Touch automatically computes sums, indicators and checks the validity of the data to make sure the data entered reflects the reality on the ground. "},{"id":"1.2.3","name":"Output","contents":"Provides different tools for reporting – both for automated routine reports and analysis reports, and in addition provides the user with functionality and flexibility to make their user defined reports. This includes:-Reports which provides access to the Periodic Report Form and  Dashboard which provides quick access to the favorites HMIS indicators."}]},{"id":"1.3","name":"How to use the DHIS2 TOUCH","contents":"This section provides instructions and guidance on how to use the HMIS Mobile App and how to navigate to its features","subMenu":[]},{"id":"1.4","name":"Installation and Login","contents":"The DHIS 2 Touch App may be downloaded from HISPTZ App store and installed on the Android Smartphone. Once successfully installed the App, the login screen of the system will appear, asking to fill in authentication details such as URL for DHIS 2 instance, Username and Password to be able to log into the App . In case the login is not successful you will be notified immediately that either URL for DHIS2 instance, Username or Password provided is incorrect and will be asked to re-enter the credentials. Once the credentials are correct, click login button for App to download all necessary metadata. Download of DHIS2 Touch on the user’s smartphones enables them to download all necessary metadata required for using the App offline.","subMenu":[]},{"id":"1.5","name":"Menus and Navigation","contents":"DHIS2 Touch App has two menu systems: Apps menu and Utilities menu. The Apps menu leads to various modules which include Data entry, Reports, and Event capture which works offline and Dashboard, module which needs internet connectivity to sync with server to get data presented. The Utility apps also leads to various modules which include Profile, About, Help, and Logout.","subMenu":[{"id":"1.5.1","name":"Navigating the App menu","contents":"The DHIS2 Touch App consists of various modules (major components) which each have specific features. Such features include Data Entry, Reports, Event Capture, Dashboard, Sync, and Settings. Navigating from one module to another under App menu is by touching on the component of your selection. Once any of the module has been selected, it will open to allow user to further continue with selecting other important parameters for data entry or to display data in the App. To go back to select other module components of Apps, user needs to press back button of their smartphones."},{"id":"1.5.2","name":"Navigating the utility menu","contents":"DHIS 2 Touch App consists of various utility modules which have specific features. Such features include Profile, About, Help, and Logout. Navigating from one module to another under Utility menu is by touching on the component of your selection. Touching a back button of smartphone will bring a user utility menus to select another module."}]}]},{"id":"2.0","name":"Data entry","tags":"Data_entry.help","contents":"This app is for offline aggregate data reporting at all levels. To enter data in the mobile App, click Data Entry in the App menu. Then select organization unit, data set and period from data entry menu to get data entry form opened","subMenu":[{"id":"2.1","name":"Selecting Data Entry form","contents":"Coming soon!","subMenu":[{"id":"2.1.1","name":"Select data entry form","contents":"Coming soon!","subMenu":[]},{"id":"2.1.2","name":"Select entry form","contents":"Coming soon!","subMenu":[]},{"id":"2.1.3","name":"Select period","contents":"Coming soon!","subMenu":[]}]},{"id":"2.2","name":"Perform data entry","contents":"Coming soon!","subMenu":[]}]},{"id":"3.0","name":"Event capture","tags":"Perfoming data entry event capture","contents":"Coming soon!","subMenu":[]},{"id":"4.0","name":"Dashboard","tags":"dashboard chart table ","contents":"Coming soon!","subMenu":[]},{"id":"5.0","name":"Sync","tags":"sync upload data via sms download metadata","contents":"Sync is allow user to send data from the mobile phone to the ministry server, update metadata and clear data stored in the mobile phone that is used to collect data. Under sync app, Upload Data via Sms, Download Metadata and Clear Offline Data are performed.","subMenu":[{"id":"5.1","name":"Upload data via sms","contents":"Upload Data gives room for users to send data from the smartphone to the main ministry server through sending SMS. When user enters data offline, they will be stored in the smartphone until they are send to DHIS 2 instance.DHIS 2 touch The HMIS Mobile app can be used to send data even if there is no internet by SMS.","subMenu":[]},{"id":"5.2","name":"Downloading Metadata","contents":"DHIS 2 app allows user to download and update data definitions and reports whenever changes has been made in the system. Examples of data definitions (metadata) are Organization units, Data sets, Indicators etc. For example if a new facility has been added or there is change of status of the facility, user needs to update these changes in his device.","subMenu":[]},{"id":"5.3","name":"Clear offline data","contents":"Clear Offline Data is an option that gives user to clear data values or events that are stored in the smartphone. This feature helps in empting storage space of the android phones once data have been synched to DHIS 2 instance.","subMenu":[]}]},{"id":"6.0","name":"Setting","tags":"setting data entry form Synchronization","contents":"Settings allow user to set up various options regarding mobile data app in the android device and the server. The following options can be changed via settings","subMenu":[{"id":"6.1","name":"Synchronization","contents":"This is the option that user can set up to define the frequency (in minutes or hours) data can be sent from the device to the server. After getting to the setting, user can touch the label “Synchronization” to get option to change the synchronization time, both the number and its units. Then user can press SAVE button to effect the changes.","subMenu":[]},{"id":"6.2","name":"data entry form","contents":"DHIS 2 touch gives option for user to make changes on Form label and maximum number of data elements to be displayed under one section of the default entry form. Click data entry form option to able to select options under it. Select Form Label to select DHIS2 Display Name or DHIS2 Form Name options . User can set maximum data element per section that can make the entire form to be displayed in one page or sections of it to be displayed in separate pages. Press SAVE button to save the changes","subMenu":[]}]},{"id":"7.0","name":"Managing utilities menu","tags":"managing utilities menu about profile logout log out","contents":"Utility menu has modules that allow user to view user profile, system information, configuration of some parameters and logout. This is the part where user can change some default system settings that came with an app after downloading.","subMenu":[{"id":"7.1","name":"About","contents":"About menu allow user view various system and data information setup and exchange between mobile phone and server. Once user has pressed About button, he will be able to view various system information such as name of the App, Version number, aggregate data values and events synced to the server.","subMenu":[]},{"id":"7.2","name":"Profile","contents":"Its for users to view their profile information as they are entered or updated in the DHIS2 system. Through profile user can see the assigned organization unit, roles, assigned programs, and assigned forms.","subMenu":[]},{"id":"7.3","name":"Logout","contents":"DHIS 2 is secured system. It needs username and password for user to login. However as for any other applications run on android, once it has been downloaded and installed in user’s mobile phones, it remains open and therefore anyone who may have access to open such mobile phone can access the HMIS Mobile App as well. To avoid that, users are asked to logout every time they finish accessing it. User needs to go to utility menu and touch Logout icon. Once user touched a logout icon, the system will immediately logout and login page for user to enter password to login.","subMenu":[]}]}];
    return this.getHelpContentAsObject(helpContent);
  }

  getHelpContentAsObject(helpContents){
    let object = {};
    helpContents.forEach(helpContent=>{
      object[helpContent.id] = helpContent;
    });
    return object;
  }
}