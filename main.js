var eventBus = new Vue()

Vue.component('dashboard', {
    template: `
    <div class="dashboard">   
      
      <dashboard-header v-bind:courses="courses"></dashboard-header>  
      
      <div class="sortContainer">
        <label for="sortOptions">Sort by</label>
        <div class="sortBars">
          <div class="sortBarTop"></div>
          <div class="sortBarMiddle"></div>
          <div class="sortBarBottom"></div>
        </div>
        <i class="sortArrow""></i>
        <select id="sortOptions" v-on:change="sortBy($event)">
          <option class="selectOption" v-bind:value="'dateEnrolled'">Date enrolled</option>
          <option class="selectOption" v-bind:value="'courseTitle'">Course title</option>
          <option class="selectOption" v-bind:value="'dueDate'">Due date</option>
          <option class="selectOption" v-bind:value="'progress'">Progress</option>
        </select>
      </div>

      <div class="courses" v-if="selectedTab == 'To Do'">
        <div class="searchContainer">
          <i class="fas fa-search fa-lg"></i>
          <input class="searchBar" v-model="searchText" placeholder="Search courses"/>
          <p class="searchText"><b>{{filterToDo.length}}</b> out of {{courses.length}} courses match your search</p>      
        </div>

        <div v-for="course in filterToDo " class="courseCard">
            <card-contents v-bind:course="course"></card-contents>
        </div>
      </div>
      
      <div class="courses" v-else-if="selectedTab == 'In Progress'">
        <div class="searchContainer">
          <i class="fas fa-search fa-lg"></i>
          <input class="searchBar" v-model="searchText" placeholder="Search courses"/>
          <p class="searchText"><b>{{filterInProg.length}}</b> out of {{courses.length}} courses match your search</p>      
        </div>

        <div v-for="course in filterInProg" class="courseCard">
            <card-contents v-bind:course="course"></card-contents>
        </div>
      </div>
      
      <div class="courses" v-else-if="selectedTab == 'Completed'">
        <div class="searchContainer">
          <i class="fas fa-search fa-lg"></i>
          <input class="searchBar" v-model="searchText" placeholder="Search courses"/>
          <p class="searchText"><b>{{filterComplete.length}}</b> out of {{courses.length}} courses match your search</p>      
        </div>
        
        <div v-for="course in filterComplete" class="courseCard">
            <card-contents v-bind:course="course"></card-contents>
        </div>
      </div>

      <div class="courses" v-else>
        <div class="searchContainer">
          <i class="fas fa-search fa-lg"></i>
          <input class="searchBar" v-model="searchText" placeholder="Search courses"/>
          <p class="searchText"><b>{{filterAll.length}}</b> out of {{courses.length}} courses match your search</p>      
        </div>

        <div v-for="course in courses" class="courseCard">
            <card-contents v-bind:course="course"></card-contents>
        </div>
      </div>
    </div>
    `,
    data() {
      return {
          searchText: '',
          selectedTab: 'To Do',
          courses: [
            {
              image: 'https://images.unsplash.com/photo-1519021228607-ef6e4c22d821?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              alt: 'sand-dune-adventures',
              title: 'Sand Dune Adventures',
              description: 'Dunes are large masses of wind-blown sand, and are most common in deserted environments, such as the Sahara, and also near beaches. An area with dunes is called a dune system.',
              daysRemaining: 6,
              dateEnrolled: '02 March 2020',
              progress: 3,
              id: 1,
              isEnrolled: true,
              inProgress: true,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1545922016-87c93aaca2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
              alt: 'aviation-academy',
              title: 'Aviation Academy',
              description: 'Aviation or air transport are the activities surrounding mechanical flight and the aircraft industry. Aircraft includes fixed-wing and rotary-wing types, morphable wings, wing-less lifting bodies, as well as lighter-than-air craft such as hot air balloons and airships.',
              daysRemaining: 30,
              dateEnrolled: '03 March 2020',
              progress: 5,
              isEnrolled: true,
              inProgress: false,
              isComplete: true,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              alt: 'the-perfect-roast',
              title: 'The Perfect Roast',
              description: 'The word barista comes from Italian, where it means a male or female "bartender" who typically works behind a counter, serving hot drinks (such as espresso), cold alcoholic and non-alcoholic beverages, and snacks.',
              daysRemaining: 3,
              dateEnrolled: '07 March 2020',
              progress: 1,
              isEnrolled: true,
              inProgress: true,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1295&q=80',
              alt: 'cosmetology-basics',
              title: 'Cosmetology Basics',
              description: 'A shampoo technician shampoos and conditions a client\'s hair in preparation for the hair stylist This is generally an apprentice position and a first step for many just out of cosmetology school.',
              daysRemaining: 8,
              dateEnrolled: '11 March 2020',
              progress: 0,
              isEnrolled: true,
              inProgress: false,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1416339134316-0e91dc9ded92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
              title: 'Turn Trash into Treasure',
              description: 'Flipping is a term used to describe purchasing a revenue-generating asset and quickly reselling (or "flipping") it for profit. Though flipping can apply to any asset, the term is most often applied to real estate and initial public offerings (IPOs).',
              daysRemaining: 30,
              dateEnrolled: '12 March 2020',
              progress: 2,
              isEnrolled: true,
              inProgress: true,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1500468756762-a401b6f17b46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
              title: 'Get Motivated!',
              description: 'At minimum, motivation requires the biological substrate for physical sensations of pleasure and pain; animals can thus want or disdain specific objects based on sense perception and experience.',
              daysRemaining: 30,
              dateEnrolled: '31 December 9999',
              progress: 0,
              isEnrolled: false,
              inProgress: false,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1532330384785-f94c84352e91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1299&q=80',
              title: 'Public Transport Tips',
              description: 'Public transport (also known as public transportation, public transit, or mass transit) is a system of transport, in contrast to private transport, for passengers by group travel systems available for use by the general public, typically managed on a schedule, operated on established routes, and that charge a posted fee for each trip.',
              daysRemaining: 30, 
              dateEnrolled: '31 December 9999',
              progress: 0,
              isEnrolled: false,
              inProgress: false,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
              title: 'The Art of Photography',
              description: 'Photography is the art, application and practice of creating durable images by recording light or other electromagnetic radiation, either electronically by means of an image sensor, or chemically by means of a light-sensitive material such as photographic film.',
              daysRemaining: 30,
              dateEnrolled: '31 December 9999',
              progress: 0,
              isEnrolled: false,
              inProgress: false,
              isComplete: false,
              toggleProgress: false
            },
            {
              image: 'https://images.unsplash.com/photo-1504197885-609741792ce7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              alt: 'venturing-venice',
              title: 'Venturing Venice',
              description: 'Venice is a city in northeastern Italy and the capital of the Veneto region. It is situated on a group of 118 small islands that are separated by canals and linked by over 400 bridges.',
              daysRemaining: 30,
              dateEnrolled: '31 December 9999',
              progress: 0,
              isEnrolled: false,
              inProgress: false,
              isComplete: false,
              toggleProgress: false
            }
          ],
      }
    },
    methods: {
      // sorts the courses based on event input
      sortBy(event){
        if (event.target.value == 'courseTitle'){
          function compare(a, b) {
            if (a.title < b.title)
              return -1;
            if (a.title > b.title)
              return 1;
            return 0;
          }
          return this.courses.sort(compare);
        }  
        else if (event.target.value == 'progress'){
          function compare(a, b) {
            return a.progress - b.progress;
          }
          return this.courses.sort(compare);
        }  
        else if (event.target.value == 'dateEnrolled'){
          function compare(a, b) {
            var dateA = new Date(a.dateEnrolled);
            var dateB = new Date(b.dateEnrolled);
            return dateA - dateB;
          }
          return this.courses.sort(compare);
        }
        else if (event.target.value == 'dueDate'){
          function compare(a, b) {
            return a.daysRemaining - b.daysRemaining;
          }
          return this.courses.sort(compare);
        }
      }
    },
    computed: {
      filterToDo: function() {
        var returnList = [];
        var self = this;

        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i]
          if (course.isEnrolled){
              returnList.push(course);
          }      
        }

        if(this.searchText == ''){
          return returnList;
        }
        return returnList.filter(function(course){
          return course.title.indexOf(self.searchText) >= 0;
        });
      },

      filterInProg: function() {
        var returnList = [];
        var self = this;

        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i]
          if (course.inProgress){
              returnList.push(course);
          }      
        }

        if(this.searchText == ''){
          return returnList;
        }
        return returnList.filter(function(course){
          return course.title.indexOf(self.searchText) >= 0;
        });
      },

      filterComplete: function() {
        var returnList = [];
        var self = this;

        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i]
          if (course.isComplete){
              returnList.push(course);
          }      
        }

        if(this.searchText == ''){
          return returnList;
        }
        return returnList.filter(function(course){
          return course.title.indexOf(self.searchText) >= 0;
        });
      },

      filterAll: function() {
        var self = this;
        if(this.searchText == ''){
          return this.courses;
        }
        return this.courses.filter(function(course){
          return course.title.indexOf(self.searchText) >= 0;
        });
      }
    },
    mounted() {
      eventBus.$on('update-selected-tab', tab => {
        this.selectedTab = tab;
      })
    }
  })

  Vue.component('dashboard-header', {
    props: {
      courses: {
        type: Array,
        required: true
      }
    },

    template: `
      <div class="header">
        <h1>Your Courses</h1> 
        <div class="tab">
          <button
          v-bind:class="{ activeTab: selectedTab === tab }"
          v-for="(tab, index) in tabs"
          v-bind:key="index"
          v-on:click="updateSelected(tab)"
          >{{ tab }} 
            <span v-if="tab === 'To Do'">
              {{countEnrolled}}
            </span> 
            <span v-else-if="tab === 'In Progress'">
              {{countInProgress}}
            </span> 
            <span v-else-if="tab === 'Completed'">
              {{countComplete}}
            </span> 
            <span v-else>
              {{countTotal}}
            </span> 
          </button>
        </div>
      </div>
    `,

    data() {
      return {
        tabs: ['To Do', 'In Progress', 'Completed', 'All courses'],
        selectedTab: 'To Do'
      }
    },

    methods: {
      updateSelected(tab){
        this.selectedTab = tab;
        eventBus.$emit('update-selected-tab', tab);
      }
    },

    computed: {
      countEnrolled(){
        var count = 0;
        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i];
          if (course.isEnrolled)
            count++;           
        }
        return count;
      },

      countInProgress(){
        var count = 0;
        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i];
          if (course.inProgress)
            count++;        
        }
        return count;
      },

      countComplete(){
        var count = 0;
        for (let i = 0; i < this.courses.length; i++) { 
          var course = this.courses[i];
          if (course.isComplete)
            count++ ;           
        }
        return count;
      },

      countTotal(){
        return this.courses.length;
      },
    }
  })

  Vue.component('card-contents', {
    props: {
      course: Object
    },

    template: `
      <div>
        <div v-if="course.daysRemaining < 10">
          <div class="reminderContainer">
            <i class="fas fa-calendar-day fa-lg"></i>
            <p class="reminderText">Due in <b>{{course.daysRemaining}} days</b></p>
          </div>
        </div>
        <img v-bind:src="course.image" v-bind:alt="course.alt">
        
        <div class="progressBar">
          <div v-bind:style="'width:'+ (course.progress * 20) + '%'"></div>
        </div>
        <div class="cardDetailsContainer">
          <h3>{{course.title}}</h3>
          <div v-if="!course.toggleProgress">
            <p>{{course.description}}</p>
          </div>
          <div v-else>
            <ul>
              <li v-for="(module, i) in modules">
                <p v-if="completeModules(course.progress, i)" class="completeModule">{{module}}</p>
                <p v-else class="incompleteModule">{{module}}</p>
              </li>
            </ul>
          </div>
        </div>

        <card-button v-bind:course="course"></card-button>  
      </div>
    `,

    data() {
      return {
        modules: ['Course Introduction', 'Course Essentials', 'Course Mastery', 'Course Challenges', 'Course Review']
      }
    },
    methods: {
      completeModules(progress, index) {
        if (index < progress)
          return true;
        else 
          return false;
      }
    }
  })

  Vue.component('card-button', {
    props: {
      course: Object
    },

    template: `
      <div>
        <button class="genericButton" v-if="course.inProgress">Resume</button>
        <button class="genericButton" v-else-if="course.isComplete">Review</button>
        <button class="genericButton" v-else-if="course.isEnrolled && !course.inProgress">Start</button>
        <button class="genericButton" v-else>Enrol</button>
        <button class="hiddenButton" v-if="!toggle" v-on:click="updateToggle(course)">View Progress</button>
        <button class="hiddenButton" v-else v-on:click="updateToggle(course)">View Details</button>
      </div>
    `,
    data() {
      return {
        toggle: false
      }
    },
    methods: {        
      updateToggle(course) {
        if (this.toggle)
        {
          this.toggle = false;
          course.toggleProgress = false;
        }
        else 
        {
          this.toggle = true;
          course.toggleProgress = true;
        }
      }
    }
  })

var app = new Vue({
  el: '#app',
  data: {
    test: 'test'
  }
})

  