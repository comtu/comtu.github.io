---
layout : post
title : "Git 常用命令整理"
category : Git
duoshuo: true
date : 2014-10-19
tags : [Git , 版本控制]
---

# 初始化配置

```python
#配置使用git仓库的人员姓名  
git config --global user.name "Your Name Comes Here"  
  
#配置使用git仓库的人员email  
git config --global user.email you@yourdomain.example.com  
  
#配置到缓存 默认15分钟  
git config --global credential.helper cache   
  
#修改缓存时间  
git config --global credential.helper 'cache --timeout=3600'    
  
git config --global color.ui true  
git config --global alias.co checkout  
git config --global alias.ci commit  
git config --global alias.st status  
git config --global alias.br branch  
git config --global core.editor "mate -w"    # 设置Editor使用textmate  
git config core.ignorecase false             #设置大小写敏感
git config -1                                #列举所有配置  
  
#用户的git配置文件~/.gitconfig  
```

<!-- more -->

---

# 查看、添加、提交、删除、找回，重置修改文件
```python
git help <command>  # 显示command的help  
git show            # 显示某次提交的内容  
git show $id  
   
git co  -- <file>   # 抛弃工作区修改  
git co  .           # 抛弃工作区修改  
   
git add <file>      # 将工作文件修改提交到本地暂存区  
git add .           # 将所有修改过的工作文件提交暂存区  
   
git rm <file>       # 从版本库中删除文件  
git rm <file> --cached  # 从版本库中删除文件，但不删除文件  
   
git reset <file>    # 从暂存区恢复到工作文件  
git reset -- .      # 从暂存区恢复到工作文件  
git reset --hard    # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改  
   
git ci <file>  
git ci .  
git ci -a           # 将git add, git rm和git ci等操作都合并在一起做  
git ci -am "some comments"  
git ci --amend      # 修改最后一次提交记录  
   
git revert <$id>    # 恢复某次提交的状态，恢复动作本身也创建了一次提交对象  
git revert HEAD     # 恢复最后一次提交的状态  
```


---

# 查看文件diff

```python
git diff <file>     # 比较当前文件和暂存区文件差异  
git diff  
git diff <$id1> <$id2>   # 比较两次提交之间的差异  
git diff <branch1>..<branch2> # 在两个分支之间比较  
git diff --staged   # 比较暂存区和版本库差异  
git diff --cached   # 比较暂存区和版本库差异  
git diff --stat     # 仅仅比较统计信息  

#退出diff查看状态直接输入Q即可.
```

---

# 查看提交记录

```python
git log  
git log <file>      # 查看该文件每次提交记录  
git log -p <file>   # 查看每次详细修改内容的diff  
git log -p -2       # 查看最近两次详细修改内容的diff  
git log --stat      #查看提交统计信息  
```

 tig
Mac上可以使用tig代替diff和log，brew install tig

---

# 取得Git仓库

```python
#初始化一个版本仓库  
git init  
  
#Clone远程版本库  
git clone git@xbc.me:wordpress.git  
  
#添加远程版本库origin，语法为 git remote add [shortname] [url]  
git remote add origin git@xbc.me:wordpress.git  
  
#查看远程仓库  
git remote -v  
```


---

# 提交你的修改

```python
#添加当前修改的文件到暂存区  
git add .  
  
#如果你自动追踪文件，包括你已经手动删除的，状态为Deleted的文件  
git add -u  
  
#提交你的修改  
git commit –m "你的注释"  
  
#推送你的更新到远程服务器,语法为 git push [远程名] [本地分支]:[远程分支]  
git push origin master  
  
#查看文件状态  
git status  
  
#跟踪新文件  
git add readme.txt  
  
#从当前跟踪列表移除文件，并完全删除  
git rm readme.txt  
  
#仅在暂存区删除，保留文件在当前目录，不再跟踪  
git rm –cached readme.txt  
  
#重命名文件  
git mv reademe.txt readme  
  
#查看提交的历史记录  
git log  
  
#修改最后一次提交注释的，利用–amend参数  
git commit --amend  
  
#忘记提交某些修改，下面的三条命令只会得到一个提交。  
git commit –m &quot;add readme.txt&quot;  
git add readme_forgotten  
git commit –amend  
  
#假设你已经使用git add .，将修改过的文件a、b加到暂存区  
  
#现在你只想提交a文件，不想提交b文件，应该这样  
git reset HEAD b  
  
#取消对文件的修改  
git checkout –- readme.txt  
```


---

# 查看、切换、创建和删除分支

```python
git br -r           # 查看远程分支  
git br <new_branch> # 创建新的分支  
git br -v           # 查看各个分支最后提交信息  
git br --merged     # 查看已经被合并到当前分支的分支  
git br --no-merged  # 查看尚未被合并到当前分支的分支  
   
git co <branch>     # 切换到某个分支  
git co -b <new_branch> # 创建新的分支，并且切换过去  
git co -b <new_branch> <branch>  # 基于branch创建新的new_branch  
   
git co $id          # 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除  
git co $id -b <new_branch>  # 把某次历史提交记录checkout出来，创建成一个分支  
   
git br -d <branch>  # 删除某个分支  
git br -D <branch>  # 强制删除某个分支 (未被合并的分支被删除的时候需要强制)  
```


---

# 分支合并和rebase

```python
git merge <branch>               # 将branch分支合并到当前分支  
git merge origin/master --no-ff  # 不要Fast-Foward合并，这样可以生成merge提交  
   
git rebase master <branch>       # 将master rebase到branch，相当于：  
git co <branch> && git rebase master && git co master && git merge <branch>  
```


---

# Git补丁管理(方便在多台机器上开发同步时用)

```python
git diff > ../sync.patch         # 生成补丁  
git apply ../sync.patch          # 打补丁  
git apply --check ../sync.patch  #测试补丁能否成功  
```


---

# Git暂存管理

```python
git stash                        # 暂存  
git stash list                   # 列所有stash  
git stash apply                  # 恢复暂存的内容  
git stash drop                   # 删除暂存区  
```


---

# Git远程分支管理

```python
git pull                         # 抓取远程仓库所有分支更新并合并到本地  
git pull --no-ff                 # 抓取远程仓库所有分支更新并合并到本地，不要快进合并  
git fetch origin                 # 抓取远程仓库更新  
git merge origin/master          # 将远程主分支合并到本地当前分支  
git co --track origin/branch     # 跟踪某个远程分支创建相应的本地分支  
git co -b <local_branch> origin/<remote_branch>  # 基于远程分支创建本地分支，功能同上  
   
git push                         # push所有分支  
git push origin master           # 将本地主分支推到远程主分支  
git push -u origin master        # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)  
git push origin <local_branch>   # 创建远程分支， origin是远程仓库名  
git push origin <local_branch>:<remote_branch>  # 创建远程分支  
git push origin :<remote_branch>  #先删除本地分支(git br -d <branch>)，然后再push删除远程分支  
```


---

# 基本的分支管理

```python
#创建一个分支  
git branch iss53  
  
#切换工作目录到iss53  
git checkout iss53  
  
#将上面的命令合在一起，创建iss53分支并切换到iss53  
git checkout –b iss53  
  
#合并iss53分支，当前工作目录为master  
git merge iss53  
  
#合并完成后，没有出现冲突，删除iss53分支  
git branch –d iss53  
  
#拉去远程仓库的数据，语法为 git fetch [remote-name]  
git fetch  
  
#fetch 会拉去最新的远程仓库数据，但不会自动到当前目录下，要自动合并  
git pull  
  
#查看远程仓库的信息  
git remote show origin  
  
#建立本地的dev分支追踪远程仓库的develop分支  
git checkout –b dev origin/develop  
```


---

# Git远程仓库管理

```python
git remote -v                    # 查看远程服务器地址和仓库名称  
git remote show origin           # 查看远程服务器仓库状态  
git remote add origin git@ github:robbin/robbin_site.git         # 添加远程仓库地址  
git remote set-url origin git@ github.com:robbin/robbin_site.git # 设置远程仓库地址(用于修改远程仓库地址)  
git remote rm <repository>       # 删除远程仓库  
```


---

# 创建远程仓库

```python
git clone --bare robbin_site robbin_site.git  # 用带版本的项目创建纯版本仓库  
scp -r my_project.git git@ git.csdn.net:~      # 将纯仓库上传到服务器上  
   
mkdir robbin_site.git && cd robbin_site.git && git --bare init # 在服务器创建纯仓库  
git remote add origin git@ github.com:robbin/robbin_site.git    # 设置远程仓库地址  
git push -u origin master                                      # 客户端首次提交  
git push -u origin develop  # 首次将本地develop分支提交到远程develop分支，并且track  
   
git remote set-head origin master   # 设置远程仓库的HEAD指向master分支 

git push origin -f  #强制推送当前版本到网络 可结合回滚使用.
```

也可以命令设置跟踪远程库和本地库


```python
git branch --set-upstream master origin/master  
git branch --set-upstream develop origin/develop  
```

---
# Git查看并修改name和email

显示name的方法：

```python
git config user.name   #查看配置中name的值
git config --list  #查看配置列表
```

或者查看~/.gitconfig文件。

改名字：
```python
git config --global user.name "comtu"   #修改全局名称,提交版本库中显示的名称
# 或者
vi ~/.gitconfig    #通过vim编辑器打开.gitconfig查看,但有些时候会出现中文乱码.


git config user.name "comtu"   #修改当前仓库的下的配置。

git config user.email "comtu@vip.qq.com"     #修改当前仓库邮箱配置。

```
或者直接修改当前仓库的.git/config文件。



---



# Git 忽略一些文件不加入版本控制

在git中如果想忽略掉某个文件，不让这个文件提交到版本库中，可以使用修改 .gitignore 文件的方法。这个文件每一行保存了一个匹配的规则例如：

```python
# 此为注释 – 将被 Git 忽略
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

另外 git 提供了一个全局的 .gitignore，你可以在你的用户目录下创建 ~/.gitignoreglobal 文件，   
以同样的规则来划定哪些文件是不需要版本控制的。   
需要执行

	git config --global core.excludesfile ~/.gitignoreglobal
	
来使得它生效。

其他的一些过滤条件   

```python
？：代表任意的一个字符
*：代表任意数目的字符
{!ab}：必须不是此类型
{ab,bb,cx}：代表ab,bb,cx中任一类型即可
[abc]：代表a,b,c中任一字符即可
[ ^abc]：代表必须不是a,b,c中任一字符
```

由于git不会加入空目录，所以下面做法会导致tmp目录不会存在 

	tmp/*             //忽略tmp文件夹所有文件   

改下方法，在tmp下也加一个.gitignore,内容为   
```python
 *
 !.gitignore
```

还有一种情况，就是已经commit了，再加入gitignore是无效的，所以需要删除下缓存   
```python
  git rm -r --cached ignore_file
```


注意： .gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。   
    正确的做法是在每个clone下来的仓库中手动设置不要检查特定文件的更改情况。   

```python
    git update-index --assume-unchanged PATH    在PATH处输入要忽略的文件。
```

另外 git 还提供了另一种 exclude 的方式来做同样的事情，不同的是 .gitignore 这个文件本身会提交到版本库中去。   
用来保存的是公共的需要排除的文件。而 .git/info/exclude 这里设置的则是你自己本地需要排除的文件。    
他不会影响到其他人。也不会提交到版本库中去。  

.gitignore 还有个有意思的小功能， 一个空的 .gitignore 文件 可以当作是一个 placeholder 。    
当你需要为项目创建一个空的 log 目录时， 这就变的很有用。 你可以创建一个 log 目录 在里面放置一个空的 .gitignore 文件。   
这样当你 clone 这个 repo 的时候 git 会自动的创建好一个空的 log 目录了。


---

# Github协同流程

fork给自己 → clone到本地 → coding → push回自己 → github上提出Pull Request即可
之后，本地添加fork源为远端源 → 工作前先pull下fork源保持代码较新 → coding → ...


---

# GitHub更新fork的版本实践

前提   
你已经在github上fork了别人的分支，并且弄好了跟github的ssh连接。(如果没有ssh连接可使用HTTP,操作的时候会多一个输入用户名密码操作)    
相关配置详情参考：https://help.github.com    

详细操作:   

1.检出自己在github上fork别人的分支   

	git clone git@github.com:comtu/android-training-course-in-chinese.git   

2.然后增加远程分支（也就是你fork那个人的分支）名为atcic（这个名字任意）到你本地。   

	git remote add atcic git@github.com:kesenhoo/android-training-course-in-chinese.git   

如果你运行命令：git remote -v你会发现多出来了一个Bob的远程分支。如下：  

	atcic   git@github.com:kesenhoo/android-training-course-in-chinese.git (fetch)  
	atcic   git@github.com:kesenhoo/android-training-course-in-chinese.git (push)  
	origin  git@github.com:comtu/android-training-course-in-chinese.git (fetch)  
	origin  git@github.com:comtu/android-training-course-in-chinese.git (push)  

3.然后，把对方的代码拉到你本地。  

	git fetch atcic   

4.最后，合并对方的代码。    

	git merge atcic/master     

5.最最后，把最新的代码推送到你的github上。  

	git push origin master   


这样就完成了自己的代码更新。   

---

# 回滚到历史版本

## reset方式回滚

1. 查看历史版本号
`git log`

1. 回滚到某个版本 可取前七位数 
	#假设有一个版本号: 9c759cc2354430d2a24a4ec7100470fe11db219a
`git reset  --hard 9c759cc`

1. 强推送到服务器
`git push -f origin master`

reset 会影响 commit 9c759cc 之后的commit都会被退回到暂存区

建议只是自己控制的版本可以这样使用,多人协同控制的建议如下方式.


## revert方式回滚

revert 是提交一个新的版本，将需要revert的版本的内容再反向修改回去，版本会递增，不影响之前提交的内容

1. 回滚
`git revert HEAD`               #撤销前一次 commit
`git revert HEAD^`              #撤销前前一次 commit git revert HEAD^^^
`git revert commit 9c759cc`     #撤销指定的版本，撤销也会作为一次提交进行保存。

1. 提交
`git push origin master`        #提交到master分支


---

# 技巧一 提交防止织毛衣,有序地合并和提交.

1. 可以在一条分支上一起开发，你有变更的时候，在提交前，使用
`git stash` 这样将本地的修改全部缓存在一个堆栈中了

1. 把别人的修改同步过来 `git pull --rebase`

1. 将自己的变更恢复到最新的节点上 `git stash pop`

1. `git commit`提交，这样就会让一个分支的版本按顺序继续发展，而不是像织毛衣一样


# 技巧二 在分支上协同合作开发.不织毛衣.

git支持很多种工作流程，我们采用的一般是这样，远程创建一个主分支，本地每人创建功能分支，日常工作流程如下：

1. 去自己的工作分支
`$ git checkout work`

1. 工作
`....`

1. 提交工作分支的修改
`$ git commit -a`

1. 回到主分支
`$ git checkout master`

1. 获取远程最新的修改，此时不会产生冲突
`$ git pull`

1. 回到工作分支
`$ git checkout work`

1. 用rebase合并主干的修改，如果有冲突在此时解决
`$ git rebase master`

1. 回到主分支
`$ git checkout master`

1. 合并工作分支的修改，此时不会产生冲突。
`$ git merge work`

1. 提交到远程主干
`$ git push`

这样做的好处是，远程主干上的历史永远是线性的。  
每个人在本地分支解决冲突，不会在主干上产生冲突。也就不会出现织毛衣了.

---

# 使用中遇到的问题

## Git – fatal: Unable to create 'XXX/.git/index.lock’: File exists.的解决办法

- 1 若在window下远程打开操作窗口（不是console），进入.git目录删除index.lock文件，删除后再commit会自动再次生成index.lock。无法提交。   
- 2 使用putty console下操作，进入.git目录执行 rm -f index.lock 删除index.lock 虽然能删除，但是也是每次都会再生成。无法提交 
- 3 在.git同级目录，执行rm -f .git/index.lock（或者rm -f git/index.lock） 删除后可提交。成功！ 


---



##  Git 删除远程仓库文件或文件夹
	

使用 git rm 命令即可，有两种选择.

- 一种是 git rm --cached "文件路径"，不删除物理文件，仅将该文件从缓存中删除；
- 一种是 git rm --f "文件路径"，不仅将该文件从缓存中删除，还会将物理文件删除（不会回收到垃圾桶）

假如你有文件不小心commit到了服务器那么你想要删除它,可以使用:

```python
#删除目录
# 说明 -r 递归删除  -n只是查看会被删除的列表不会真实操作  
git rm -r -n --cached *node_modules/\* #删除远程仓库node_modules目录下的所有文件
git rm -r --cached *node_modules/\*    # 说明 最终执行命令

#删除文件
git rm --cached "路径+文件名"   


#接下来
git commit -m "delete file"  
#最后
git push
```

若用`git status`命令查看，则node_modules/目录下文件出现在结果列表里， 我们不希望这个目录下的文件出现，则在项目根目录下，和.git 同级目录下，新建一个.gitignore文件，

把.gitignore提交到远程服务器。 则node_modules目录就不会被提交了。


---

---

## IDEA中分支切换error: The following untracked working tree files would be overwritten by checkout


在IDEA中进行分支切换时，出现如此错误，导致无法正常切换：   
 
	error: The following untracked working tree files would be overwritten by checkout

通过错误提示可知，是由于一些untracked working tree files引起的问题。    
所以只要解决了这些untracked的文件就能解决这个问题。

解决方式：
git进入本地版本仓库目录下，直接执行`git clean -d -fx`即可。    
可能很多人都不明白-d，-fx到底是啥意思，其实`git clean -d -fx`表示：删除一些没有 git add 的文件；   

```python
    git clean 参数 
    -n 显示将要删除的文件和目录；
    -x -----删除忽略文件已经对git来说不识别的文件
    -d -----删除未被添加到git的路径中的文件
    -f -----强制运行
    git clean -n
    git clean -df
    git clean -f
```

---

## git clone 时显示Filename too long的解决办法

在git bash中，运行下列命令： 

	git config --global core.longpaths true

就可以解决该问题。

--global是该参数的使用范围，如果只想对本版本库设置该参数，只要在上述命令中去掉--global即可。


## 切换警告 warning: LF will be replaced by CRLF in 

windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示，解决办法：

	$ git config --global core.autocrlf false  //禁用自动转换  



---

Git版本控制大全: 

[http://git-scm.com/book/zh/v1](http://git-scm.com/book/zh/v1)
