## Format confirmé par la RH

> Pas de code qui compile — **pseudo-code** et discussion. L'interviewer te donne une **feature existante** (souvent récente) sur monday.com. Tu expliques **comment tu l'aurais construite de bout en bout** : besoin user, UX, architecture, edge cases, tradeoffs.

**Comment t'entraîner ici :** pour chaque cas, lis le prompt → écris ta réponse dans un doc → scroll jusqu'à **Réponse modèle E2E** → compare.

---

## Ce qu'ils évaluent

1. **Décomposer** un gros problème en étapes simples
2. **Comprendre ce qui se passe derrière** — pas seulement « ça marche »
3. **Peser les tradeoffs** — jamais une solution parfaite
4. **Analyser perf et efficacité**
5. **Mindset user-first**
6. **Communiquer** comme une conversation entre ingénieurs

---

## Framework — structure ta réponse (30–40 min)

1. **Clarifier le besoin user** — qui, quelle douleur, happy path
2. **Décomposer** — UI / state / API / jobs async / permissions / observabilité
3. **Pseudo-code** sur la partie la plus intéressante
4. **Edge cases** — au moins 5 sans qu'on te les donne
5. **Tradeoffs** — 2 approches, laquelle pour MVP vs scale
6. **Métriques** — adoption, erreurs, latence
7. **Tes questions** à l'interviewer

**Phrase magique :** « Pour le MVP je ferais X parce que… ; à l'échelle je migrerais vers Y parce que… »

---

## Vocabulaire produit monday

| Concept | Description |
|---------|-------------|
| **Board** | Tableau — lignes = items, colonnes = champs typés |
| **Item** | Tâche / lead / ticket |
| **Column** | Status, Person, Date, Connect boards, Formula, Mirror… |
| **View** | Table, Kanban, Calendar, Gantt, Chart, Form |
| **Automation** | Règle When → Do |
| **Update** | Fil de commentaires sur un item |
| **Dashboard** | Widgets agrégés depuis un ou plusieurs boards |

---

## Cas pratiques

Écris ta réponse avant de lire le modèle.

---

### Cas 1 — Automations

**Probabilité : très probable**

**Prompt interviewer :**

> « On a les Automations sur monday : l'user crée une règle *Quand Status passe à Done → notifier le PM et assigner à Sarah*. Explique-moi comment tu aurais construit ça de bout en bout. »

**À couvrir :** modèle de données, moment d'exécution, boucles infinies, UI builder, colonne supprimée, permissions.

**Ta réponse :** _(écris ici dans ton doc)_

#### Réponse modèle E2E

**1. Besoin user**

Un PM gère un board de 200 tâches. À chaque fois qu'une tâche passe en Done, il veut que Sarah soit assignée et notifiée — sans le faire manuellement 30 fois par semaine. La feature doit être **self-serve** : pas besoin d'un dev pour chaque règle.

**2. Happy path UX**

1. User ouvre le panneau Automations sur son board
2. Choisit un **trigger** : « Quand Status change »
3. Ajoute une **condition** (optionnel MVP+) : « …et la nouvelle valeur est Done »
4. Ajoute des **actions** : « Assigner à Sarah » + « Notifier Sarah »
5. Voit un **résumé en langage naturel** : « Quand Status passe à Done → assigner Sarah + notifier »
6. Active la règle → toast « Automation active »

**3. Décomposition**

```
UI Builder (wizard 3 étapes)
  → Validation client (trigger + ≥1 action)
  → API POST /boards/{id}/automations
  → DB : table automations
  → Event bus (item.column_changed)
  → Automation engine (match rules → enqueue actions)
  → Workers : assign_item, send_notification
  → Audit log + métriques
```

**4. Modèle de données**

```
Automation {
  id, board_id, created_by, enabled: bool
  trigger: { type: "column_change", column_id, operator?, value? }
  conditions: [{ column_id, operator, value }]  // MVP+ 
  actions: [{ type: "assign"|"notify"|"move_group", params }]
  run_count, last_run_at, last_error
}
```

**5. Pseudo-code — moteur d'exécution**

```
onColumnChange(item, column, oldValue, newValue, actor):
  if column.type != STATUS: return

  rules = getEnabledAutomations(item.board_id)
  for rule in rules:
    if !rule.trigger.matches(column, oldValue, newValue): continue
    if !allConditionsPass(rule, item): continue
    if wouldCreateLoop(rule, item): log + skip
    enqueue(AutomationJob { rule_id, item_id, actor_id })

--- worker ---
runAutomationJob(job):
  rule = load(job.rule_id)
  item = load(job.item_id)
  for action in rule.actions:
    try:
      execute(action, item)   // assign, notify, webhook…
    catch err:
      logFailure(job, action, err)
      retryWithBackoff(job)   // max 3
```

**6. Edge cases**

| Cas | Solution |
|-----|----------|
| **Boucle infinie** (A change status → B assigne → re-trigger) | Flag `source: automation` sur les writes ; ignorer les events générés par automations sur le même trigger |
| **Colonne Status supprimée** | Règle passe en `disabled` + badge « broken » + email à l'owner |
| **Sarah n'a plus accès au board** | Action assign échoue → notification à l'owner de la règle |
| **50 règles sur le même trigger** | Queue async obligatoire ; rate limit par compte |
| **Bulk update** (10 items Done d'un coup) | Debounce ou batch : 1 job par item, pas de blocage UI |
| **User sans permission** | Vérifier que `created_by` avait les droits ; exécuter avec le contexte de la règle, pas de l'actor |

**7. Tradeoffs**

| Choix | MVP | Scale |
|-------|-----|-------|
| Exécution | Async queue dès le départ (l'user ne attend pas) | Workers dédiés par tenant gros compte |
| Conditions | Trigger simple seulement | Conditions multiples AND/OR |
| UI | Wizard 3 étapes | + mode avancé pour power users |
| Boucles | Flag `source: automation` | Graphe de dépendances entre règles |

**8. Métriques**

- % boards avec ≥1 automation active
- Taux d'échec par type d'action
- Latence p95 trigger → notification reçue
- Nombre de règles « broken » (colonne supprimée)

**9. Questions à poser**

« Quel est le pain point #1 des users sur les automations aujourd'hui — complexité, fiabilité, ou découvrabilité ? »

---

### Cas 2 — Vue Kanban

**Probabilité : très probable**

**Prompt interviewer :**

> « Un board a 10 000 items. L'user bascule entre Table, Kanban (groupé par Status) et Calendar (colonne Date). Comment tu aurais construit ça ? »

**À couvrir :** source of truth, virtualisation, drag & drop optimistic, filtres serveur, real-time.

**Ta réponse :** _(écris ici)_

#### Réponse modèle E2E

**1. Besoin user**

Une équipe ops veut **la même donnée sous 3 angles** : liste dense (Table), workflow visuel (Kanban), planning (Calendar). Changer de vue ne doit pas recharger toute la page ni perdre les filtres.

**2. Principe clé**

**Une seule source of truth** : `items[]` + `columns[]` + `viewConfig` (filtres, tri, groupement). Chaque vue est un **renderer** différent sur les mêmes données.

```
BoardStore
  items: Item[]           // paginé / virtualisé
  columns: Column[]
  viewConfig: { type, filters, sort, groupBy }
  pendingUpdates: Map<itemId, optimisticPatch>
```

**3. Happy path — drag Kanban**

1. User drag carte de « Working » → « Done »
2. UI **optimistic** : carte bouge immédiatement
3. `PATCH /items/{id}` `{ status_column: "Done" }`
4. Succès → commit ; échec → rollback + toast
5. Event → automations + real-time push aux autres users

**4. Pseudo-code — changement de vue**

```
switchView(newType):
  saveViewConfig(boardId, { ...viewConfig, type: newType })
  // Pas de refetch si items déjà en cache et filtres identiques
  if needsRefetch(newType, viewConfig):
    fetchItems({ boardId, filters, cursor })
  renderView(newType, items, columns)

renderKanban(items, groupByColumn):
  groups = groupBy(items, groupByColumn)
  for group in groups:
    renderColumn(group.label, virtualizedList(group.items))

onDragEnd(item, newStatus):
  applyOptimistic(item.id, { status: newStatus })
  api.patch(item.id, { status: newStatus })
    .catch(() => rollback(item.id))
```

**5. Scale — 10K items**

| Vue | Stratégie |
|-----|-----------|
| **Table** | Virtualisation (`react-window`) ; pagination serveur 50–100 rows |
| **Kanban** | Charger par colonne : `GET items?status=Done&limit=50` ; infinite scroll par colonne |
| **Calendar** | `GET items?date_range=month` — jamais les 10K |

Filtres et tri **côté serveur** dès que > 500 items. URL sync : `/boards/123?view=kanban&status=Working` pour partage.

**6. Edge cases**

- **Item sans date** en Calendar → section « Non planifié » ou masqué selon config
- **Timezone** : stocker UTC, afficher locale user
- **Drag pendant qu'un collègue filtre** : websocket met à jour le store ; si l'item sort du filtre, animation de sortie
- **Colonne Status renommée** : `column_id` stable, pas le label
- **Permission lecture seule** : drag désactivé, curseur explicite

**7. Tradeoffs**

| | Option A | Option B |
|---|----------|----------|
| Groupement Kanban | Client si < 500 items | Serveur `group_by=status` |
| Optimistic UI | Oui (UX fluide) | Pessimistic (plus simple, plus lent) |
| Real-time | WebSocket push | Polling 30s (MVP cheap) |

**MVP :** optimistic + pagination serveur + polling. **Scale :** websocket + virtualisation + fetch par colonne.

**8. Métriques**

- Temps de switch Table → Kanban
- Taux d'erreur rollback drag & drop
- Items rendus sans jank (FPS, LCP)

---

### Cas 3 — Workforms

**Probabilité : probable**

**Prompt interviewer :**

> « Workforms : un formulaire public (ex. demande de support) qui crée automatiquement un item dans un board. Comment tu l'aurais fait ? »

**À couvrir :** mapping champs → colonnes, validation, spam, permissions, confirmation user.

**Ta réponse :** _(écris ici)_

#### Réponse modèle E2E

**1. Besoin user**

Une équipe support veut un **lien public** `forms.monday.com/abc123` : le client remplit nom + email + problème → un item apparaît dans le board « Tickets » avec les bonnes colonnes remplies. Zéro login pour le soumetteur.

**2. Happy path**

1. Admin crée un Workform depuis son board : choisit quels champs afficher
2. Mappe chaque champ → colonne du board (Text → « Description », Email → « Contact »)
3. Publie → reçoit un lien + option embed
4. Visiteur remplit → Submit
5. Item créé → écran de confirmation « Merci, on revient vers vous »
6. Équipe voit l'item + notification

**3. Décomposition**

```
Form Builder (admin, authentifié)
  → Form schema (fields, mapping, settings)
  → Public form page (non auth)
  → POST /public/forms/{token}/submit
  → Validation + anti-spam
  → create_item(board_id, mapped_values)
  → Notification équipe + webhook optionnel
```

**4. Pseudo-code — submit**

```
onPublicSubmit(formToken, payload):
  form = loadPublicForm(formToken)
  if !form.published: return 404

  if !rateLimit(ip, formToken): return 429
  if !captchaValid(payload): return 400

  mapped = {}
  for field in form.fields:
    value = payload[field.id]
    if field.required && !value: return validationError(field)
    mapped[field.target_column_id] = normalize(value, field.type)

  item = createItem(form.board_id, mapped, { source: "workform", form_id })
  notifyBoardOwners(form.board_id, item)
  if form.auto_reply_email:
    sendConfirmation(payload.email, form.template)

  return { success: true, message: form.thank_you_text }
```

**5. Edge cases**

| Cas | Solution |
|-----|----------|
| **Spam / bots** | Rate limit IP + hCaptcha/reCAPTCHA + honeypot field |
| **Colonne cible supprimée** | Form passe en draft + alerte admin |
| **Fichier upload** | Taille max, scan virus, stockage S3, colonne Files |
| **Board privé** | Le form token est le seul vecteur de création — pas d'enumération |
| **Doublon** (même email 50x) | Option « limiter 1 soumission / email / jour » |
| **GDPR** | Lien politique confidentialité, rétention configurable |

**6. Tradeoffs**

| | MVP | V1+ |
|---|-----|-----|
| Anti-spam | Rate limit + honeypot | + CAPTCHA |
| Customisation | Champs fixes | Branding, logo, couleurs |
| Redirect | Message merci | Redirect URL custom |

**7. Métriques**

- Taux de soumission / abandon (funnel)
- Spam bloqué %
- Temps création item après submit

---

### Cas 4 — Collaboration temps réel

**Probabilité : probable**

**Prompt interviewer :**

> « Deux users éditent le même item : Alice change le Status, Bob change le titre en même temps. Comment tu gères ça ? »

**À couvrir :** conflits, websockets, présence, impact automations.

**Ta réponse :** _(écris ici)_

#### Réponse modèle E2E

**1. Besoin user**

Sur un board partagé, Alice et Bob travaillent sur le même ticket. Ils doivent voir les changements **sans écraser** le travail de l'autre, et savoir que l'autre est « en train d'éditer ».

**2. Stratégie de conflit**

Pour monday, je recommande **last-write-wins au niveau champ** (field-level), pas document entier :

- Alice change `status` → OK
- Bob change `title` → OK (pas de conflit, champs différents)
- Si les deux changent `title` → le timestamp le plus récent gagne + toast « Bob a aussi modifié le titre » chez Alice

**OT (Operational Transform)** est overkill pour un item structuré en colonnes. **CRDT** utile seulement pour le fil Updates (texte libre).

**3. Architecture**

```
Client A/B ←WebSocket→ Realtime Gateway ←→ Pub/Sub
                              ↓
                         Item Service (source of truth)
```

**4. Pseudo-code**

```
onLocalEdit(itemId, field, value):
  applyOptimistic(itemId, field, value)
  ws.send({ type: "patch", itemId, field, value, clientVersion })

onRemotePatch(patch):
  if patch.field == localEditingField:
    showConflictBanner("Quelqu'un a aussi modifié ce champ")
  merge(patch)  // field-level merge

onPatchServer(itemId, field, value, actor, ts):
  if !actor.canEdit(itemId): reject
  db.update(itemId, field, value)
  if field triggers automations:
    emitColumnChange(itemId, field, old, new, source: "user")
  broadcastToBoard(itemId, { field, value, actor, ts })
```

**5. Présence**

- `user_viewing: item_123` → afficher avatars en haut de l'item
- `user_editing: title` → indicateur sur la cellule
- Heartbeat 30s, cleanup on disconnect

**6. Edge cases**

- **Offline** : queue locale, replay au reconnect ; conflit si version serveur plus récente
- **Automations** : déclenchées **une fois** par event serveur validé, pas par optimistic client
- **Bulk paste** 100 cellules : batch API, pas 100 websocket messages
- **Item supprimé** pendant l'édition : redirect + toast

**7. Tradeoffs**

| | Field-level LWW | OT/CRDT |
|---|-----------------|---------|
| Complexité | Faible | Élevée |
| UX champs distincts | Parfait | Overkill |
| Texte libre Updates | Conflit possible | CRDT mieux |

**8. Métriques**

- Conflits même champ / session
- Latence patch → visible chez l'autre user (p95 < 300ms)

---

### Cas 5 — Dashboard widgets

**Probabilité : possible**

**Prompt interviewer :**

> « Un manager crée un Dashboard avec un widget : *nombre d'items Done par personne*, agrégé depuis 3 boards. Comment tu l'aurais construit ? »

**À couvrir :** requête agrégée, cache, permissions cross-board, refresh.

**Ta réponse :** _(écris ici)_

#### Réponse modèle E2E

**1. Besoin user**

Un manager ne veut pas ouvrir 3 boards pour voir qui a fermé le plus de tâches ce mois. Il veut un **widget** mis à jour qui respecte ce qu'il a le droit de voir.

**2. Happy path**

1. User crée un Dashboard → Add widget → « Chart / Numbers »
2. Sélectionne les 3 boards source + colonne Status + valeur « Done » + groupement par Person
3. Voit un bar chart / table
4. Widget se refresh (manuel ou auto toutes les X min)

**3. Décomposition**

```
Dashboard UI (grid drag & drop layout)
  → Widget config (type, data_source, filters, group_by)
  → API GET /dashboards/{id}/widgets/{wid}/data
  → Aggregation service (query cross-boards)
  → Cache Redis (TTL 5 min)
  → Respect permissions par board
```

**4. Pseudo-code — agrégation**

```
getWidgetData(widget, user):
  boards = widget.board_ids.filter(b => user.canRead(b))
  if boards.empty: return emptyState

  cacheKey = hash(widget.config, boards, user.id)
  if cached = redis.get(cacheKey): return cached

  result = {}
  for board in boards:
    items = queryItems(board, {
      status: widget.config.done_value,
      date_range: widget.config.period
    })
    for item in items:
      person = item.person_column
      result[person] = (result[person] || 0) + 1

  redis.set(cacheKey, result, TTL=5min)
  return result
```

**5. Edge cases**

| Cas | Solution |
|-----|----------|
| User perd accès à 1 board | Widget affiche données partielles + note « 1 source inaccessible » |
| 100K items | Pré-agrégation nightly ou index matérialisé |
| Colonne Person vide | Bucket « Unassigned » |
| Status différent par board | Mapping config : board A « Done » = board B « Terminé » |
| Stale data | Badge « Mis à jour il y a 5 min » + bouton refresh |

**6. Tradeoffs**

| | Live query | Pre-aggregated |
|---|------------|----------------|
| Fraîcheur | Temps réel | Delay acceptable |
| Coût DB | Élevé à scale | Cheap reads |
| MVP | Live + cache 5min | Job nightly si lent |

**7. Métriques**

- Temps de load widget p95
- Cache hit rate
- Dashboards actifs par compte

---

### Cas 6 — Connect boards

**Probabilité : possible**

**Prompt interviewer :**

> « Colonne Connect boards : un item Projet est lié à plusieurs Clients. On affiche le nom du client en Mirror column. Comment tu l'aurais fait ? »

**À couvrir :** relation M:N, mirror, permissions, perf N+1, suppression.

**Ta réponse :** _(écris ici)_

#### Réponse modèle E2E

**1. Besoin user**

Une équipe projets a un board « Projets » et un board « Clients ». Sur chaque projet, ils veulent **lier** les clients concernés et **voir le nom du client** sans dupliquer la donnée.

**2. Modèle de données**

```
item_links {
  id
  source_item_id    // Projet
  target_item_id    // Client
  source_board_id
  target_board_id
  created_at
}

Mirror column config {
  connect_column_id
  mirrored_column_id   // ex. « Client name » sur board Clients
}
```

Relation **many-to-many**. Lien **bidirectionnel** en UI : depuis le Client on voit aussi les Projets liés.

**3. Happy path**

1. User clique cellule Connect boards → modal recherche clients
2. Sélectionne 2 clients → liens créés
3. Mirror column affiche « Acme, Beta Corp » (labels des items liés)
4. Si le nom client change sur board Clients → miroir mis à jour automatiquement

**4. Pseudo-code**

```
onLinkItems(projectId, clientIds[]):
  for clientId in clientIds:
    if !canRead(clientId) || !canEdit(projectId): continue
    createLink(projectId, clientId)

getMirrorValue(projectItem, mirrorConfig):
  links = getLinks(projectItem, mirrorConfig.connect_column)
  values = []
  for link in links:
    target = getItem(link.target_item_id)
    values.push(target.columns[mirrorConfig.mirrored_column_id])
  return values.join(", ")

onClientNameChange(clientItem):
  affectedLinks = getLinksPointingTo(clientItem)
  invalidateMirrorCache(affectedLinks)
  pushRealtimeUpdate(affectedProjectItems)
```

**5. Edge cases**

| Cas | Solution |
|-----|----------|
| Client supprimé | Lien supprimé ; miroir affiche « Item supprimé » ou ID orphelin |
| User voit Projet mais pas Client | Masquer le nom ou « Restricted » selon policy |
| 50 clients liés | UI : chips + « +42 » ; pas 50 requêtes (batch fetch) |
| Board Client déplacé | `target_board_id` stable via board_id pas workspace path |
| Mirror sur colonne formula | Recalcul quand source change |

**6. Tradeoffs**

| | Fetch à la volée | Dénormalisation |
|---|------------------|-----------------|
| Fraîcheur | Toujours à jour | Risque stale |
| Perf | N+1 si mal fait | Reads rapides |
| Choix | Batch + cache court | Event-driven sync |

**MVP :** fetch batch à l'affichage + invalidation sur event. **Scale :** cache Redis par `(project_id, mirror_column)`.

**7. Métriques**

- Latence render cellule Connect / Mirror
- Liens orphelins count
- Erreurs permission cross-board

---

## Grille d'auto-évaluation

Note-toi sur 5 après chaque cas :

| Critère | 1 | 5 |
|---------|---|---|
| Besoin user clarifié avant la tech | | |
| Décomposition en sous-systèmes | | |
| 5+ edge cases spontanés | | |
| 2+ solutions avec tradeoffs | | |
| Perf / scale mentionnés | | |
| Pseudo-code sur le cœur du problème | | |
| Métriques de succès | | |
| Questions posées à l'interviewer | | |

**Objectif :** ≥ 4 partout.

---

## Checklist avant l'entretien

- [ ] Compte trial monday.com — boards, vues, automations, workform si dispo
- [ ] 2 cas écrits par toi (compare avec les modèles)
- [ ] 1 story STAR feature E2E de ton parcours (Wix AI = idéal)
- [ ] 3 questions pour l'interviewer préparées

---

## Après l'E2E

**System design & architecture** — plusieurs services / couches frontend. Fiche à venir.

---

## Ressources

- [Process RD Israel](https://monday.com/hr/rd-il/)
- [Technical interviews guide](https://engineering.monday.com/a-guide-to-technical-interviews-at-monday-com/)
- [Product design process](https://mondaydesign.com/communication-is-key-the-product-design-process-at-monday-com/)
