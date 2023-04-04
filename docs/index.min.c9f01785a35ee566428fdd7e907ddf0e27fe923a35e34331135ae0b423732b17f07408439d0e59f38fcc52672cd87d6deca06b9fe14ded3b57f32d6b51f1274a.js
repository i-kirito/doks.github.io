var suggestions=document.getElementById("suggestions"),search=document.getElementById("search");search!==null&&document.addEventListener("keydown",inputFocus);function inputFocus(e){e.ctrlKey&&e.key==="/"&&(e.preventDefault(),search.focus()),e.key==="Escape"&&(search.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.classList.contains("d-none");if(s)return;const t=[...suggestions.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var e=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description"],index:["title","description","content"]}});e.add({id:0,href:"/docs/webstack/",title:"导航站开源",description:"导航站开源文档",content:""}),e.add({id:1,href:"/docs/prologue/introduction/",title:"Introduction",description:"Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize.",content:`Get started #There are two main ways to get started with Doks:
Tutorial #👉 The Tutorial is intended for novice to intermediate users. Step-by-step instructions on how to start a new Doks project. Tutorial →
Quick Start #👉 The Quick Start is intended for intermediate to advanced users. One page summary of how to start a new Doks project. Quick Start →
Go further #Recipes, Reference Guides, Extensions, and Showcase.
Recipes #Get instructions on how to accomplish common tasks with Doks. Recipes →
Reference Guides #Learn how to customize Doks to fully make it your own. Reference Guides →
Extensions #Get instructions on how to add even more to Doks. Extensions →
Showcase #See what others have build with Doks. Showcase →
Contributing #Find out how to contribute to Doks. Contributing →
Help #Get help on Doks. Help →
`}),e.add({id:2,href:"/docs/webstack/introduction/",title:"介绍",description:`https://github.com/liutongxu/liutongxu.github.io
https://github.com/iplaycode/webstack-hugo
https://github.com/shenweiyan/WebStack-Hugo
Get started #有多种方式搭建本项目，具体请参考以下：
点击展开Tutorial #方法1. 使用静态托管 #最简单快速上线自己的导航网站，你可以直接下载本项目修改内容既可部署上线。
方法2. 使用 Wordpress 主题搭建系统🔥(感谢@owen0o0提供) #开源地址：https://github.com/owen0o0/WebStack
注意：付费版本和本项目没任何关系，售后问题请找作者
方法3. 使用基于 Laravel 搭建的后台系统🔥(感谢@hui-ho提供) #开源地址：https://github.com/hui-ho/WebStack-Laravel
Docker部署版本:https://hub.docker.com/r/arvon2014/webstack-laravel
方法4. Hexo主题 #开源地址： https://github.com/HCLonely/hexo-theme-webstack
方法5.1 Hugo主题一🔥 #开源地址：https://github.com/shenweiyan/WebStack-Hugo
安装说明：https://www.yuque.com/shenweiyan/cookbook/webstack-hugo
方法5.2 Hugo主题二 #开源地址： https://github.com/iplaycode/webstack-hugo
主题演示： https://iplaycode.github.io/nav/
方法6. 基于Java开发的后台系统🔥(感谢@jsnjfz提供) #开源地址：https://github.com/jsnjfz/WebStack-Guns
方法7. springboot后台 Nikati-WebStack-Guns ❤️ (感谢Nikati (Nikati)提供) #开源地址：https://github.com/Nikati/WebStack-Guns-NKT
方法8.1 使用 Jekyll 版本的后台🔥(感谢@0xl2oot提供) #开源地址：https://github.com/0xl2oot/webstack-jekyll
方法8.2 从Chrome书签生成Jekyll版本配置的工具 #体验网址： https://w.hanxi.info/convert.html
开源地址： https://github.`,content:` https://github.com/liutongxu/liutongxu.github.io
https://github.com/iplaycode/webstack-hugo
https://github.com/shenweiyan/WebStack-Hugo
Get started #有多种方式搭建本项目，具体请参考以下：
点击展开Tutorial #方法1. 使用静态托管 #最简单快速上线自己的导航网站，你可以直接下载本项目修改内容既可部署上线。
方法2. 使用 Wordpress 主题搭建系统🔥(感谢@owen0o0提供) #开源地址：https://github.com/owen0o0/WebStack
注意：付费版本和本项目没任何关系，售后问题请找作者
方法3. 使用基于 Laravel 搭建的后台系统🔥(感谢@hui-ho提供) #开源地址：https://github.com/hui-ho/WebStack-Laravel
Docker部署版本:https://hub.docker.com/r/arvon2014/webstack-laravel
方法4. Hexo主题 #开源地址： https://github.com/HCLonely/hexo-theme-webstack
方法5.1 Hugo主题一🔥 #开源地址：https://github.com/shenweiyan/WebStack-Hugo
安装说明：https://www.yuque.com/shenweiyan/cookbook/webstack-hugo
方法5.2 Hugo主题二 #开源地址： https://github.com/iplaycode/webstack-hugo
主题演示： https://iplaycode.github.io/nav/
方法6. 基于Java开发的后台系统🔥(感谢@jsnjfz提供) #开源地址：https://github.com/jsnjfz/WebStack-Guns
方法7. springboot后台 Nikati-WebStack-Guns ❤️ (感谢Nikati (Nikati)提供) #开源地址：https://github.com/Nikati/WebStack-Guns-NKT
方法8.1 使用 Jekyll 版本的后台🔥(感谢@0xl2oot提供) #开源地址：https://github.com/0xl2oot/webstack-jekyll
方法8.2 从Chrome书签生成Jekyll版本配置的工具 #体验网址： https://w.hanxi.info/convert.html
开源地址： https://github.com/hanxi/webstack-jekyll
方法9.1 钻芒二开Typecho主题 #开源地址：https://www.zmki.cn/5366.html
比较详细的安装教程：https://www.waoww.com/typecho-theme/zmki-webstack.html
预览地址：https://tool.zmki.cn/
方法9.2 SEOGO二开Typecho主题 #开源地址：https://www.seogo.me/muban/webstack.html
方法10. 静态博客Gridea主题 #开源地址: https://github.com/lmm214/gridea-theme-webstack
在线预览: https://edui.fun/
方法11. VUE版本 #开源地址: https://github.com/Anjaxs/WebStack-vue/tree/master
方法12. flask-blog-platform #开源地址: https://github.com/shitianfang/flask-blog-platform/tree/master
本站点使用教程 #使用shenweiyan大佬的教程 WebStack-Hugo | 一个静态响应式导航主题 `}),e.add({id:3,href:"/docs/prologue/",title:"文档库开源",description:'文档库开源文档"',content:""}),e.add({id:4,href:"/docs/prologue/quick-start/",title:"Quick Start",description:"One page summary of how to start a new Doks project.",content:`Requirements #Git — latest source release Node.js — latest LTS version or newer Why Node.js?Doks uses npm (included with Node.js) to centralize dependency management, making it easy to update resources, build tooling, plugins, and build scripts. Start a new Doks project #Create a new site, change directories, install dependencies, and start development server.
Create a new site #Doks is available as a child theme and a starter theme.
Child theme #Intended for novice to intermediate users Intended for minor customizations Easily update npm packages — including Doks git clone https://github.com/h-enk/doks-child-theme.git my-doks-siteStarter theme #Intended for intermediate to advanced users Intended for major customizations Easily update npm packages git clone https://github.com/h-enk/doks.git my-doks-siteHelp me chooseNot sure which one is for you? Pick the child theme. Change directories #cd my-doks-siteInstall dependencies #npm installStart development server #npm run startDoks will start the Hugo development webserver accessible by default at http://localhost:1313. Saved changes will live reload in the browser.
Other commands #Doks comes with commands for common tasks. Commands →
`}),e.add({id:5,href:"/docs/webstack/quick-start/",title:"Vercel部署",description:`Requirements #vercel — 注册一个免费账号并绑定github账号, 用于部署网站 themes — 主题webstack 根据介绍下载到本地部署并推送静态页面到github仓库 What is vercel ?Vercel是一个云端平台，可以帮助开发者快速构建和部署高性能的现代应用程序。它支持各种编程语言和框架，如React、Next.js、Vue、Angular和Svelte等。 Add a new Project #在vercel上添加一个新的项目, 选择github仓库, 选择webstack主题, 点击部署
Manage Domains #在vercel上管理域名, 选择部署的项目, 点击添加域名
快速克隆 #安装好hugo并且配置好环境变量 在hugo的themes目录下克隆主题 git clone https://github.com/shenweiyan/WebStack-Hugo.git`,content:`Requirements #vercel — 注册一个免费账号并绑定github账号, 用于部署网站 themes — 主题webstack 根据介绍下载到本地部署并推送静态页面到github仓库 What is vercel ?Vercel是一个云端平台，可以帮助开发者快速构建和部署高性能的现代应用程序。它支持各种编程语言和框架，如React、Next.js、Vue、Angular和Svelte等。 Add a new Project #在vercel上添加一个新的项目, 选择github仓库, 选择webstack主题, 点击部署
Manage Domains #在vercel上管理域名, 选择部署的项目, 点击添加域名
快速克隆 #安装好hugo并且配置好环境变量 在hugo的themes目录下克隆主题 git clone https://github.com/shenweiyan/WebStack-Hugo.git`}),e.add({id:6,href:"/docs/prologue/commands/",title:"Commands",description:"Doks comes with commands for common tasks.",content:`💡 You can change the commands in the scripts section of \`./package.json\`. create #Create new content for your site:
npm run create [path] [flags]See also the Hugo docs: hugo new.
Docs based tree #Create a docs based tree — with a single command:
npm run create -- --kind docs [section]For example, create a docs based tree named guides:
npm run create -- --kind docs guideslint #Check scripts, styles, and markdown for errors:
npm run lintscripts #Check scripts for errors:
npm run lint:scripts [-- --fix]styles #Check styles for errors:
npm run lint:styles [-- --fix]markdown #Check markdown for errors:
npm run lint:markdown [-- --fix]clean #Delete temporary directories:
npm run cleanstart #Start local development server:
npm run startbuild #Build production website:
npm run buildfunctions #Build Lambda functions:
npm run build:functionspreview #Build production website including draft and future content:
npm run build:preview`}),e.add({id:7,href:"/docs/webstack/style-css/",title:"样式修改",description:`等待更新 #`,content:`等待更新 #`}),e.add({id:8,href:"/docs/help/",title:"Help",description:"Help Doks.",content:""}),e.add({id:9,href:"/docs/help/how-to-update/",title:"How to Update",description:"Regularly update the installed npm packages to keep your Doks website stable, usable, and secure.",content:`💡 Learn more about semantic versioning and advanced range syntax. Check for outdated packages #The npm outdated command will check the registry to see if any (or, specific) installed packages are currently outdated:
npm outdated [[\u0026lt;@scope\u0026gt;/]\u0026lt;pkg\u0026gt; ...]Update packages #The npm update command will update all the packages listed to the latest version (specified by the tag config), respecting semver:
npm update [\u0026lt;pkg\u0026gt;...]`}),e.add({id:10,href:"/docs/help/troubleshooting/",title:"Troubleshooting",description:"Solutions to common problems.",content:`Problems updating npm packages #Delete the ./node_modules folder, and run again:
npm installProblems with cache #Delete the temporary directories:
npm run clean`}),e.add({id:11,href:"/docs/help/faq/",title:"FAQ",description:"Answers to frequently asked questions.",content:`Hyas? #Doks is a Hyas theme build by the creator of Hyas.
Footer notice? #Please keep it in place.
Keyboard shortcuts for search? #focus: Ctrl + / select: ↓ and ↑ open: Enter close: Esc Other documentation? #Netlify Hugo Can I get support? #Create a topic:
Netlify Community Hugo Forums Doks Discussions Contact the creator? #Send h-enk a message:
Netlify Community Hugo Forums Doks Discussions `}),e.add({id:12,href:"/docs/",title:"Docs",description:"Docs Doks.",content:""}),search.addEventListener("input",t,!0);function t(){const s=5;var n=this.value,o=e.search(n,{limit:s,enrich:!0});const t=new Map;for(const e of o.flatMap(e=>e.result)){if(t.has(e.doc.href))continue;t.set(e.doc.href,e.doc)}if(suggestions.innerHTML="",suggestions.classList.remove("d-none"),t.size===0&&n){const e=document.createElement("div");e.innerHTML=`No results for "<strong>${n}</strong>"`,e.classList.add("suggestion__no-results"),suggestions.appendChild(e);return}for(const[r,a]of t){const n=document.createElement("div");suggestions.appendChild(n);const e=document.createElement("a");e.href=r,n.appendChild(e);const o=document.createElement("span");o.textContent=a.title,o.classList.add("suggestion__title"),e.appendChild(o);const i=document.createElement("span");if(i.textContent=a.description,i.classList.add("suggestion__description"),e.appendChild(i),suggestions.appendChild(n),suggestions.childElementCount==s)break}}})()