/*
* @template : application/header
*/
  <header id="header" role="banner">
      <h1>
        <a href="./">LxxL</a>
      </h1>
  </header>

  <p id="search">
    <input type="text" placeholder="Chercher..."/><button type="submit" rel="tooltip" data-placement="right" title="Chercher quelque chose"><i class="icon-search icon-white"></i></button>
  </p>

  <nav id="user-nav" class="navbar" role="navigation">
    <!-- Logged-out, default -->
    <ul class="nav btn-group user-logged-out">
      <li class="btn btn-inverse" ><a title="{{localize nav.login.tip}}" {{action showAccountLogin href=true}} rel="tooltip" data-placement="bottom"><i class="icon icon-lock"></i><span class="text">Log-in</span></a></li>
      <li class="btn btn-mini btn-inverse"><a title="{{localize nav.register.tip}}"  {{action showAccountRegister href=true}} rel="tooltip" data-placement="bottom"><i class="icon icon-user"></i> <span class="text">{{localize nav.register.text}}</span></a></li>
    </ul>

    <!-- Logged-in -->
    <ul class="nav btn-group user-logged-in">
      <li class="btn btn-inverse" ><a title="{{localize nav.profile.tip}}" {{action showAccountProfile href=true}} rel="tooltip" data-placement="bottom"><i class="icon icon-user"></i><span class="text">{{localize nav.profile.text}}</span></a></li>
      <li class="btn btn-mini btn-inverse"><a title="{{localize nav.settings.tip}}"  {{action showAccountSettings href=true}} rel="tooltip" data-placement="bottom"><i class="icon icon-cog"></i> <span class="text">{{localize nav.settings.text}}</span></a></li>
      <li class="btn btn-mini btn-inverse"><a title="{{localize nav.logout.tip}}" href="#callcontrollerlogout" rel="tooltip" data-placement="bottom"><i class="icon icon-off"></i> <span class="text">{{localize nav.logout.text}}</span></a></li>
    </ul>
  </nav>

  <nav id="sidebar">
    <a class="visible-phone"><i class="icon icon-home"></i>Home</a>
    <ul>
      <li class="user-all">
        <a rel="tooltip" data-placement="right" title="{{localize nav.home.tip}}" id="navigation-dashboard" {{action showActions href=true}}><i class="icon icon-home"></i> <span>{{localize nav.home.text}}</span></a>
      </li>

      <li class="user-all">
        <a rel="tooltip" data-placement="right" title="{{localize nav.sandbox.tip}}" id="navigation-sandbox" {{action showSandbox href=true}}><i class="icon icon-eye-open"></i> <span>{{localize nav.sandbox.text}}</span></a>
      </li>

      <li class="submenu user-author">
        <a rel="tooltip" data-placement="right" title="{{localize nav.act.tip}}" id="navigation-myQtis" {{action showMyQTIs href=true}}><i class="icon icon-th-list"></i> <span>{{localize nav.act.text}}</span></a>
        <ul>
          <li><a rel="tooltip" data-placement="right" title="{{localize nav.actlist.tip}}" {{action showMyQTIs href=true}}>{{localize nav.actlist.text}}</a></li>
          <li><a rel="tooltip" data-placement="right" title="{{localize nav.actnew.tip}}" {{action showNewActivity href=true}}>{{localize nav.actnew.text}}</a></li>
        </ul>
      </li>

      <li class="submenu user-reviewer">
        <a rel="tooltip" data-placement="right" title="{{localize nav.allact.tip}}" id="navigation-qtis" {{action showAllQTIs href=true}}><i class="icon icon-bullhorn"></i> <span>{{localize nav.allact.text}}</span></a>
      </li>

      <li class="user-admin">
        <a rel="tooltip" data-placement="right" title="{{localize nav.users.tip}}" id="navigation-users" {{action showAllUsers href=true}}><i class="icon icon-user"></i> <span>{{localize nav.users.text}}</span></a>
      </li>
    </ul>
  </nav>
