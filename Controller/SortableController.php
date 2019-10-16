<?php

namespace Orkestra\EaSortable\Controller;

use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Configuration\ConfigManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Routing\Annotation\Route;

class SortableController extends AbstractController
{
    /**
     * @Route("/admin/sort/{property}", name="easyadmin.sortable.sort")
     * @param Request $request
     * @param ConfigManager $configManager
     * @param EntityManagerInterface $em
     * @param string $property
     * @return RedirectResponse
     */
    public function sort(Request $request, ConfigManager $configManager, EntityManagerInterface $em, string $property): RedirectResponse
    {
        $entity = $request->get('entity');
        $id = $request->get('id');
        $position = (int)$request->get('position');
        $config = $configManager->getEntityConfig($entity);
        $object = $em->find($config['class'], $id);
        if (null === $object) throw $this->createNotFoundException();

        $accessor = PropertyAccess::createPropertyAccessor();
        $accessor->setValue($object, $property, $position);
        $em->flush();

        return $this->redirectToRoute('easyadmin', [
            'action' => 'list',
            'entity' => $entity
        ]);
    }
}