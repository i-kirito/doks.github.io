var suggestions=document.getElementById("suggestions"),search=document.getElementById("search");search!==null&&document.addEventListener("keydown",inputFocus);function inputFocus(e){e.ctrlKey&&e.key==="/"&&(e.preventDefault(),search.focus()),e.key==="Escape"&&(search.blur(),suggestions.classList.add("d-none"))}document.addEventListener("click",function(e){var t=suggestions.contains(e.target);t||suggestions.classList.add("d-none")}),document.addEventListener("keydown",suggestionFocus);function suggestionFocus(e){const s=suggestions.classList.contains("d-none");if(s)return;const t=[...suggestions.querySelectorAll("a")];if(t.length===0)return;const n=t.indexOf(document.activeElement);if(e.key==="ArrowUp"){e.preventDefault();const s=n>0?n-1:0;t[s].focus()}else if(e.key==="ArrowDown"){e.preventDefault();const s=n+1<t.length?n+1:n;t[s].focus()}}(function(){var e=new FlexSearch.Document({tokenize:"forward",cache:100,document:{id:"id",store:["href","title","description"],index:["title","description","content"]}});e.add({id:0,href:"/docs/webstack/introduction/",title:"介绍",description:`https://github.com/liutongxu/liutongxu.github.io
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
本站点使用教程 #使用shenweiyan大佬的教程 WebStack-Hugo | 一个静态响应式导航主题 `}),e.add({id:1,href:"/docs/webstack/",title:"导航站",description:"导航站开源文档",content:""}),e.add({id:2,href:"/docs/webstack/quick-start/",title:"Vercel部署",description:`Requirements #vercel — 注册一个免费账号并绑定github账号, 用于部署网站 themes — 主题webstack 根据介绍下载到本地部署并推送静态页面到github仓库 What is vercel ?Vercel是一个云端平台，可以帮助开发者快速构建和部署高性能的现代应用程序。它支持各种编程语言和框架，如React、Next.js、Vue、Angular和Svelte等。 Add a new Project #在vercel上添加一个新的项目, 选择github仓库, 选择webstack主题, 点击部署
Manage Domains #在vercel上管理域名, 选择部署的项目, 点击添加域名
快速克隆 #安装好hugo并且配置好环境变量 在hugo的themes目录下克隆主题 git clone https://github.com/shenweiyan/WebStack-Hugo.git`,content:`Requirements #vercel — 注册一个免费账号并绑定github账号, 用于部署网站 themes — 主题webstack 根据介绍下载到本地部署并推送静态页面到github仓库 What is vercel ?Vercel是一个云端平台，可以帮助开发者快速构建和部署高性能的现代应用程序。它支持各种编程语言和框架，如React、Next.js、Vue、Angular和Svelte等。 Add a new Project #在vercel上添加一个新的项目, 选择github仓库, 选择webstack主题, 点击部署
Manage Domains #在vercel上管理域名, 选择部署的项目, 点击添加域名
快速克隆 #安装好hugo并且配置好环境变量 在hugo的themes目录下克隆主题 git clone https://github.com/shenweiyan/WebStack-Hugo.git`}),e.add({id:3,href:"/docs/webstack/style-css/",title:"样式修改",description:`等待更新 #`,content:`等待更新 #`}),e.add({id:4,href:"/docs/help/",title:"文档库",description:"Help Doks.",content:""}),e.add({id:5,href:"/docs/help/start/",title:"搭建",description:`💡 Node.js框架下部署hugo静态页面 前置需要 #下载最新 node.js LTS版本 安装到本地或Linux服务器:
fork并克隆主题 doks GitHub 到本地或Linux服务器:
安装依赖 #在主题目录下执行命令安装依赖: npm install启动本地服务 #安装成功后执行命令启动本地服务: npm run start`,content:`💡 Node.js框架下部署hugo静态页面 前置需要 #下载最新 node.js LTS版本 安装到本地或Linux服务器:
fork并克隆主题 doks GitHub 到本地或Linux服务器:
安装依赖 #在主题目录下执行命令安装依赖: npm install启动本地服务 #安装成功后执行命令启动本地服务: npm run start`}),e.add({id:6,href:"/docs/help/pull/",title:"部署",description:`把本地仓库推送到远程仓库 #使用 GitHub Desktop 推送到远程仓库
或者直接命令行推送到远程仓库
git init # 初始化本地仓库git add . # 添加所有文件到暂存区git commit -m \u0026quot;first commit\u0026quot; # 提交到本地仓库git remote add origingit push -u origin master # 推送到远程仓库node.js生成静态页面 npm run build:preview`,content:`把本地仓库推送到远程仓库 #使用 GitHub Desktop 推送到远程仓库
或者直接命令行推送到远程仓库
git init # 初始化本地仓库git add . # 添加所有文件到暂存区git commit -m \u0026quot;first commit\u0026quot; # 提交到本地仓库git remote add origingit push -u origin master # 推送到远程仓库node.js生成静态页面 npm run build:preview`}),e.add({id:7,href:"/docs/help/faq/",title:"FAQ",description:`官方开源文档 #Hugo
doks`,content:`官方开源文档 #Hugo
doks
`}),e.add({id:8,href:"/docs/",title:"Docs",description:"Docs Doks.",content:""}),search.addEventListener("input",t,!0);function t(){const s=5;var n=this.value,o=e.search(n,{limit:s,enrich:!0});const t=new Map;for(const e of o.flatMap(e=>e.result)){if(t.has(e.doc.href))continue;t.set(e.doc.href,e.doc)}if(suggestions.innerHTML="",suggestions.classList.remove("d-none"),t.size===0&&n){const e=document.createElement("div");e.innerHTML=`No results for "<strong>${n}</strong>"`,e.classList.add("suggestion__no-results"),suggestions.appendChild(e);return}for(const[r,a]of t){const n=document.createElement("div");suggestions.appendChild(n);const e=document.createElement("a");e.href=r,n.appendChild(e);const o=document.createElement("span");o.textContent=a.title,o.classList.add("suggestion__title"),e.appendChild(o);const i=document.createElement("span");if(i.textContent=a.description,i.classList.add("suggestion__description"),e.appendChild(i),suggestions.appendChild(n),suggestions.childElementCount==s)break}}})()